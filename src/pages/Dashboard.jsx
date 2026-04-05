import React, { useState, useEffect } from 'react';
import { CLASSES, SUBJECTS } from '../data/mockSyllabus';
import { FileText, Calendar, Activity, Tag } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        testsToday: 0,
        totalTests: 0,
        popularSubject: 'N/A',
        recentActivity: []
    });

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedTests') || '[]');

        const now = new Date();
        const todayStr = now.toDateString();

        let testsToday = 0;
        let subjectCounts = {};

        saved.forEach(test => {
            const date = new Date(test.dateCreated);
            if (date.toDateString() === todayStr) {
                testsToday++;
            }

            const subjKey = `${test.cls}_${test.subject}`;
            subjectCounts[subjKey] = (subjectCounts[subjKey] || 0) + 1;
        });

        let mostPopularSubjKey = null;
        let maxCount = 0;
        for (const [key, count] of Object.entries(subjectCounts)) {
            if (count > maxCount) {
                maxCount = count;
                mostPopularSubjKey = key;
            }
        }

        // Calculate distribution by class
        const classStats = {};
        let totalClassTests = 0;
        saved.forEach(test => {
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
                count: classStats[clsId],
                percentage
            };
        }).sort((a, b) => b.count - a.count);

        let popularSubjectName = 'N/A';
        if (mostPopularSubjKey) {
            const [clsId, subId] = mostPopularSubjKey.split('_');
            const clsName = CLASSES.find(c => c.id === clsId)?.name || '';
            const subName = SUBJECTS[clsId]?.find(s => s.id === subId)?.name || '';
            if (clsName && subName) {
                popularSubjectName = `${subName} (${clsName})`;
            }
        }

        setStats({
            testsToday,
            totalTests: saved.length,
            popularSubject: popularSubjectName,
            classDistribution,
            recentActivity: saved.slice(0, 5) // Top 5 newest
        });
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getClassName = (id) => CLASSES.find(c => c.id === id)?.name || id;
    const getSubjectName = (clsId, subId) => SUBJECTS[clsId]?.find(s => s.id === subId)?.name || subId;

    return (
        <div className="glass fade-in" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', minHeight: 'calc(100vh - 5rem)' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Overview</h1>
                <p className="text-muted">Welcome back! Here's what's happening with your tests today.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tests Today</h3>
                        <Activity size={20} className="text-muted opacity-50" />
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary-color)', lineHeight: 1 }}>{stats.testsToday}</p>
                </div>
                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Library</h3>
                        <FileText size={20} className="text-muted opacity-50" />
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-dark)', lineHeight: 1 }}>{stats.totalTests}</p>
                </div>
                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Most Popular</h3>
                        <Tag size={20} className="text-muted opacity-50" />
                    </div>
                    <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-dark)', marginTop: '0.5rem' }}>{stats.popularSubject}</p>
                </div>
            </div>

            <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                {/* Recent Activity */}
                <div className="slide-up">
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.4rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Activity size={22} color="var(--primary-color)" /> Recent Activity
                    </h2>

                    {stats.recentActivity.length === 0 ? (
                        <div className="glass" style={{ padding: '4rem 2rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '2px dashed var(--border-color)' }}>
                            <p className="text-muted">No recent activity found. Start by generating a test!</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {stats.recentActivity.map((test, idx) => (
                                <div key={test.id} className="glass" style={{ 
                                    padding: '1.25rem 1.5rem', 
                                    borderRadius: 'var(--radius-md)', 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    animationDelay: `${idx * 0.1}s` 
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                        <div style={{ 
                                            background: 'var(--primary-light)', 
                                            padding: '0.8rem', 
                                            borderRadius: '12px', 
                                            color: 'var(--primary-color)',
                                            display: 'flex'
                                        }}>
                                            <FileText size={22} />
                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>{test.testTitle}</h4>
                                            <p className="text-muted" style={{ margin: '0.2rem 0 0 0', fontSize: '0.9rem', fontWeight: '500' }}>
                                                {getClassName(test.cls)} • {getSubjectName(test.cls, test.subject)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: '500' }}>
                                        <Calendar size={14} /> {formatDate(test.dateCreated)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Class Distribution Analytics */}
                <div className="slide-up" style={{ animationDelay: '0.2s' }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.4rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Activity size={22} color="var(--primary-color)" /> Subject Insights
                    </h2>

                    <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                        {!stats.classDistribution?.length ? (
                            <p className="text-muted" style={{ textAlign: 'center', padding: '2rem 0' }}>Generation trends will appear here.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {stats.classDistribution.map(item => (
                                    <div key={item.id}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.95rem' }}>
                                            <span style={{ fontWeight: '700' }}>{item.name}</span>
                                            <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>{item.count} tests ({item.percentage}%)</span>
                                        </div>
                                        <div style={{ width: '100%', backgroundColor: 'var(--bg-color)', borderRadius: '999px', height: '0.6rem', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                                            <div style={{
                                                width: `${item.percentage}%`,
                                                backgroundColor: 'var(--primary-color)',
                                                height: '100%',
                                                borderRadius: '999px',
                                                transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                                boxShadow: '0 0 10px rgba(99, 102, 241, 0.3)'
                                            }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
