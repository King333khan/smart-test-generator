import React, { useState, useEffect } from 'react';
import { CLASSES, SUBJECTS } from '../data/mockSyllabus';
import { FileText, Calendar, Activity } from 'lucide-react';

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
        <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', minHeight: 'calc(100vh - 4rem)' }}>
            <h1 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: 'bold' }}>Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div className="glass" style={{ padding: '1.5rem', borderRadius: '0.75rem', background: 'white' }}>
                    <h3 style={{ color: 'var(--text-muted)' }}>Tests Generated Today</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '0.5rem', color: 'var(--primary-color)' }}>{stats.testsToday}</p>
                </div>
                <div className="glass" style={{ padding: '1.5rem', borderRadius: '0.75rem', background: 'white' }}>
                    <h3 style={{ color: 'var(--text-muted)' }}>Total Tests</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '0.5rem', color: 'var(--primary-color)' }}>{stats.totalTests}</p>
                </div>
                <div className="glass" style={{ padding: '1.5rem', borderRadius: '0.75rem', background: 'white' }}>
                    <h3 style={{ color: 'var(--text-muted)' }}>Popular Subject</h3>
                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: 'var(--text-dark)' }}>{stats.popularSubject}</p>
                </div>
            </div>

            <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Recent Activity */}
                <div>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Activity size={20} className="text-muted" /> Recent Activity
                    </h2>

                    {stats.recentActivity.length === 0 ? (
                        <div className="glass" style={{ padding: '2rem', borderRadius: '0.5rem', background: 'white', textAlign: 'center' }}>
                            <p className="text-muted">No recent activity found. Generate a test to see it here.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {stats.recentActivity.map(test => (
                                <div key={test.id} className="glass" style={{ padding: '1rem 1.5rem', borderRadius: '0.5rem', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary-color)' }}>
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '600' }}>{test.testTitle}</h4>
                                            <p className="text-muted" style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem' }}>
                                                {getClassName(test.cls)} • {getSubjectName(test.cls, test.subject)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                        <Calendar size={14} /> {formatDate(test.dateCreated)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Class Distribution Analytics */}
                <div>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Activity size={20} className="text-muted" /> Tests Distribution
                    </h2>

                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '0.75rem', background: 'white' }}>
                        {!stats.classDistribution?.length ? (
                            <p className="text-muted" style={{ textAlign: 'center', padding: '1rem 0' }}>Not enough data yet.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {stats.classDistribution.map(item => (
                                    <div key={item.id}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                            <span style={{ fontWeight: '600' }}>{item.name}</span>
                                            <span className="text-muted">{item.count} tests ({item.percentage}%)</span>
                                        </div>
                                        <div style={{ width: '100%', backgroundColor: 'var(--bg-color)', borderRadius: '999px', height: '0.5rem', overflow: 'hidden' }}>
                                            <div style={{
                                                width: `${item.percentage}%`,
                                                backgroundColor: 'var(--primary-color)',
                                                height: '100%',
                                                borderRadius: '999px',
                                                transition: 'width 1s ease-in-out'
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
