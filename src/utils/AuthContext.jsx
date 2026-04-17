import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async (userId, userEmail) => {
        if (!userId) {
            setProfile(null);
            return;
        }
        
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (data) {
                // FORCE OVERRIDE FOR MASTER ADMIN
                if (userEmail && userEmail.toLowerCase() === 'king333khan@gmail.com') {
                    data.plan_type = 'Pro';
                    data.subscription_status = 'active';
                    data.max_tests = 99999;
                }
                setProfile(data);
            }
        } catch (err) {
            console.error('Error loading profile:', err);
        }
    };

    useEffect(() => {
        // SAFETY TIMEOUT: Force-stop loading after 5 seconds to prevent blank screen
        const timeout = setTimeout(() => {
            setLoading(false);
            console.warn('Auth timeout: Forcing app to render.');
        }, 5000);

        const getSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                const currentUser = session?.user ?? null;
                setUser(currentUser);
                if (currentUser) {
                    await fetchProfile(currentUser.id, currentUser.email);
                }
            } catch (err) {
                console.error('Session error:', err);
                // Even on error, we proceed to hide blank screen
            } finally {
                clearTimeout(timeout);
                setLoading(false);
            }
        };

        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            try {
                const currentUser = session?.user ?? null;
                setUser(currentUser);
                if (currentUser) {
                    await fetchProfile(currentUser.id, currentUser.email);
                } else {
                    setProfile(null);
                }
            } catch (err) {
                console.error('Auth change error:', err);
            } finally {
                setLoading(false);
            }
        });

        return () => {
            clearTimeout(timeout);
            subscription.unsubscribe();
        };
    }, []);

    // Monitoring effect
    useEffect(() => {
        if (user) {
            console.log('✅ Auth State: User detected', user.email);
            if (profile) {
                console.log('✅ Auth State: Profile loaded', profile.institute_name, profile.plan_type);
            } else {
                console.log('⏳ Auth State: Profile still loading...');
            }
        } else {
            console.log('👤 Auth State: No user logged in');
        }
    }, [user, profile]);

    const updateProfile = async (updates) => {
        if (!user) return;
        try {
            const { error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id);
            if (error) throw error;
            await fetchProfile(user.id, user.email);
        } catch (err) {
            console.error('Update profile error:', err);
        }
    };

    const syncLocalToCloud = async () => {
        if (!user || !profile) return;
        
        console.log('🔄 Starting SaaS Cloud Sync...');
        
        try {
            // 1. Sync Settings (Logo & Institute Name)
            const localSettings = JSON.parse(localStorage.getItem('appSettings') || '{}');
            if (localSettings.logo && !profile.institute_logo_url) {
                await updateProfile({ 
                    institute_logo_url: localSettings.logo,
                    institute_name: localSettings.defaultInstitute || profile.institute_name 
                });
            }

            // 2. Sync Question Bank
            const localBank = JSON.parse(localStorage.getItem('customQuestionBank') || '{}');
            for (const clsSubj of Object.keys(localBank)) {
                const [cls, subject] = clsSubj.split('_');
                for (const chId of Object.keys(localBank[clsSubj])) {
                    const types = localBank[clsSubj][chId];
                    for (const type of Object.keys(types)) {
                        const qs = types[type];
                        if (qs && qs.length > 0) {
                            for (const q of qs) {
                                // Upload to custom_questions table
                                await supabase.from('custom_questions').insert({
                                    user_id: user.id,
                                    class: cls,
                                    subject: subject,
                                    chapter: chId,
                                    type: type,
                                    data: q
                                });
                            }
                        }
                    }
                }
            }

            // 3. Sync Saved Tests
            const localTests = JSON.parse(localStorage.getItem('savedTests') || '[]');
            if (localTests.length > 0) {
                for (const test of localTests) {
                    await supabase.from('saved_tests').insert({
                        user_id: user.id,
                        test_title: test.testTitle,
                        cls: test.cls,
                        subject: test.subject,
                        config: test.config,
                        test_data: test
                    });
                }
            }

            // Mark as synced to avoid duplicates
            localStorage.setItem('saas_synced', 'true');
            console.log('✅ SaaS Cloud Sync Complete!');
        } catch (err) {
            console.error('Sync Error:', err);
        }
    };

    useEffect(() => {
        if (user && profile && !localStorage.getItem('saas_synced')) {
            syncLocalToCloud();
        }
    }, [user, profile]);

    const value = {
        signUp: (data) => supabase.auth.signUp(data),
        signIn: (data) => supabase.auth.signInWithPassword(data),
        signOut: () => supabase.auth.signOut(),
        resetPassword: (email) => supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/settings' }),
        user,
        profile,
        updateProfile,
        refreshProfile: () => fetchProfile(user?.id),
        isPro: profile?.plan_type === 'Pro' || profile?.plan_type === 'Premium',
        isSubscriptionActive: profile?.subscription_status === 'active'
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="premium-loader-container fade-in">
                    <div className="premium-loader"></div>
                    <div className="premium-loader-text">Authenticating...</div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
