import React, { useState, useEffect } from 'react';
import { CLASSES, SUBJECTS } from '../data/mockSyllabus';
import { useAuth } from '../utils/AuthContext';
import { supabase } from '../utils/supabaseClient';
import { FileText, Calendar, Activity, Tag, Crown, ShieldAlert, TrendingUp, PieChart as PieIcon } from 'lucide-react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, Legend 
} from 'recharts';

const Dashboard = () => {
    const { profile, isPro, isSubscriptionActive } = useAuth();
    const [stats, setStats] = useState({
        testsToday: 0,
        totalTests: 0,
        popularSubject: 'N/A',
        classDistribution: [],
        trendData: [],
        recentActivity: []
    });

    useEffect(() => {
        const fetchStats = async () => {
            if (!profile) return;
            
            try {
                const { data: saved, error } = await supabase
                    .from('saved_tests')
                    .select('id, test_title, cls, subject, created_at')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                const now = new Date();
                const todayStr = now.toDateString();

                let testsToday = 0;
                let subjectCounts = {};
                let classStats = {};
                let totalClassTests = 0;
                
                // For Trend Chart (Last 7 Days)
                const last7Days = [...Array(7)].map((_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    return { date: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), count: 0, fullDate: d.toDateString() };
                }).reverse();

                saved.forEach(test => {
                    const date = new Date(test.created_at);
                    const dateStr = date.toDateString();
                    
                    if (dateStr === todayStr) testsToday++;

                    // Update trend data
                    const trendItem = last7Days.find(d => d.fullDate === dateStr);
                    if (trendItem) trendItem.count++;

                    const subjKey = `${test.cls}_${test.subject}`;
                    subjectCounts[subjKey] = (subjectCounts[subjKey] || 0) + 1;

                    if (test.cls) {
                        classStats[test.cls] = (classStats[test.cls] || 0) + 1;
                        totalClassTests++;
                    }
                });

                const classDistribution = Object.keys(classStats).map(clsId => {
                    const percentage = totalClassTests > 0 ? Math.round((classStats[clsId] / totalClassTests) * 100) : 0;
                    return {
                        id: clsId,
                        name: CLASSES.find(c => c.id === clsId)?.name || clsId,
                        value: classStats[clsId],
                        percentage
                    };
                }).sort((a, b) => b.value - a.value);

                let popularSubjectName = 'N/A';
                const mostPopularEntry = Object.entries(subjectCounts).sort((a, b) => b[1] - a[1])[0];
                if (mostPopularEntry) {
                    const [clsId, subId] = mostPopularEntry[0].split('_');
                    popularSubjectName = `${SUBJECTS[clsId]?.find(s => s.id === subId)?.name || ''} (${CLASSES.find(c => c.id === clsId)?.name || ''})`;
                }

                setStats({
                    testsToday,
                    totalTests: saved.length,
                    popularSubject: popularSubjectName,
                    classDistribution,
                    trendData: last7Days,
                    recentActivity: saved.slice(0, 5).map(t => ({ ...t, dateCreated: t.created_at }))
                });
            } catch (err) { console.error(err); }
        };
        fetchStats();
    }, [profile]);

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

    const usagePercentage = profile ? Math.min(Math.round((profile.tests_count / profile.max_tests) * 100), 100) : 0;

    return (
        <div className="glass fade-in" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', minHeight: 'calc(100vh - 5rem)' }}>
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Dashboard</h1>
                    <p className="text-muted">Welcome to your smart control center.</p>
                </div>
                
                <div className={`glass ${isPro ? 'pro-badge' : 'free-badge'}`} style={{ 
                    padding: '0.75rem 1.25rem', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '0.75rem', 
                    border: '1px solid currentColor', background: isPro ? 'rgba(255, 215, 0, 0.1)' : 'rgba(100, 100, 100, 0.1)', color: isPro ? '#b8860b' : 'var(--text-muted)'
                }}>
                    {isPro ? <Crown size={18} fill="currentColor" /> : <Activity size={18} />}
                    <span style={{ fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem' }}>{isPro ? `${profile?.plan_type} Plan` : 'Free Plan'}</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="glass card-hover" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', background: 'var(--card-bg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Usage Limit</h3>
                        <ShieldAlert size={18} color={usagePercentage > 80 ? '#ef4444' : '#64748b'} />
                    </div>
                    <div style={{ fontWeight: '800', fontSize: '1.75rem', marginBottom: '0.5rem' }}>{profile?.tests_count || 0}<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/{profile?.max_tests || 10}</span></div>
                    <div style={{ width: '100%', background: 'var(--bg-color)', height: '6px', borderRadius: '3px' }}>
                        <div style={{ width: `${usagePercentage}%`, height: '100%', background: usagePercentage > 80 ? '#ef4444' : 'var(--primary-color)', borderRadius: '3px' }}></div>
                    </div>
                </div>

                <div className="glass card-hover" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', background: 'var(--card-bg)' }}>
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1rem' }}>Generated Today</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-color)' }}>{stats.testsToday}</p>
                </div>

                <div className="glass card-hover" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', background: 'var(--card-bg)' }}>
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1rem' }}>Total Library</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: '800' }}>{stats.totalTests}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <TrendingUp size={20} color="var(--primary-color)" />
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Generation Trend (7 Days)</h2>
                    </div>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.trendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                                <Line type="monotone" dataKey="count" stroke="var(--primary-color)" strokeWidth={4} dot={{ r: 6, fill: 'var(--primary-color)', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <PieIcon size={20} color="var(--primary-color)" />
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Class Distribution</h2>
                    </div>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={stats.classDistribution} 
                                    innerRadius={60} outerRadius={100} 
                                    paddingAngle={5} dataKey="value"
                                >
                                    {stats.classDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                <div className="slide-up">
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Activity size={22} color="var(--primary-color)" /> Recent Activity
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {stats.recentActivity.map((test, idx) => (
                            <div key={test.id} className="glass list-item" style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                    <div style={{ background: 'var(--primary-light)', padding: '0.8rem', borderRadius: '12px', color: 'var(--primary-color)' }}><FileText size={22} /></div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>{test.test_title}</h4>
                                        <p className="text-muted" style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem' }}>{CLASSES.find(c => c.id === test.cls)?.name} • {SUBJECTS[test.cls]?.find(s => s.id === test.subject)?.name}</p>
                                    </div>
                                </div>
                                <div className="text-muted" style={{ fontSize: '0.8rem', fontWeight: '600' }}><Calendar size={14} style={{ marginRight: '4px' }}/> {formatDate(test.dateCreated)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
