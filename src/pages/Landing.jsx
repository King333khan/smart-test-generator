import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Shield, BookOpen, Clock, ArrowRight, Target, TrendingUp, Sparkles } from 'lucide-react';
import appLogo from '../assets/logo.png';

const Landing = () => {
    return (
        <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-dark)', overflowX: 'hidden' }}>
            {/* Navigation */}
            <nav className="glass" style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1rem 5%', borderBottom: '1px solid var(--border-color)', borderRadius: 0
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={appLogo} alt="Smart Test Generator" style={{ width: '40px', borderRadius: '8px' }} />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Smart Test Generator</h2>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/login" className="btn btn-secondary">Login</Link>
                    <Link to="/signup" className="btn">Get Started</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{ 
                padding: '10rem 5% 6rem', 
                textAlign: 'center',
                background: 'radial-gradient(circle at top, var(--primary-light), transparent 60%)'
            }}>
                <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--card-bg)', border: '1px solid var(--primary-color)', color: 'var(--primary-color)', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '2rem' }}>
                        <Sparkles size={16} /> <span>The #1 Testing SaaS for Institutes</span>
                    </div>
                    <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
                        Transform Your <span style={{ color: 'var(--primary-color)' }}>Assessment</span> Workflow
                    </h1>
                    <p className="text-muted" style={{ fontSize: '1.25rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                        Stop relying on manual typists. Smart Test Generator is a cloud-based subscription platform that empowers educational institutes to generate professional, error-free tests in minutes.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <Link to="/signup" className="btn" style={{ fontSize: '1.1rem', padding: '1rem 2rem', borderRadius: '999px' }}>
                            Start Free Trial <ArrowRight size={20} />
                        </Link>
                        <a href="#roi" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem', borderRadius: '999px' }}>
                            Why Subscribe?
                        </a>
                    </div>
                </div>
            </section>

            {/* Why Subscribe? / The ROI Section */}
            <section id="roi" style={{ padding: '6rem 5%' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Why Institutes Subscribe</h2>
                    <p className="text-muted" style={{ fontSize: '1.1rem', marginTop: '1rem' }}>The return on investment makes it an effortless decision.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="glass slide-up" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', textAlign: 'left', borderTop: '4px solid #ef4444' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '1rem', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)' }}>
                            <Clock size={32} color="#ef4444" />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Save 20+ Hours a Week</h3>
                        <p className="text-muted" style={{ lineHeight: 1.6 }}>Manual typing and formatting take forever. With our SaaS, teachers can generate a 50-mark paper in just 3 minutes with zero formatting headaches.</p>
                    </div>

                    <div className="glass slide-up" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', textAlign: 'left', borderTop: '4px solid #10b981', animationDelay: '0.1s' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '1rem', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)' }}>
                            <TrendingUp size={32} color="#10b981" />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Reduce Typist Costs</h3>
                        <p className="text-muted" style={{ lineHeight: 1.6 }}>Paying hourly or monthly salaries to typists adds up quickly. A single subscription covers your entire institute at a fraction of the cost.</p>
                    </div>

                    <div className="glass slide-up" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', textAlign: 'left', borderTop: '4px solid #f59e0b', animationDelay: '0.2s' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '1rem', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)' }}>
                            <Target size={32} color="#f59e0b" />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Zero Errors</h3>
                        <p className="text-muted" style={{ lineHeight: 1.6 }}>Our AI-verified question bank ensures no typos, misplaced diagrams, or wrong options. Deliver absolute perfection to your students every time.</p>
                    </div>
                </div>
            </section>

            {/* Features Spotlight */}
            <section style={{ padding: '6rem 5%', backgroundColor: 'var(--card-bg)' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Platform Capabilities</h2>
                    <p className="text-muted" style={{ fontSize: '1.1rem', marginTop: '1rem' }}>Powerful tools accessible from any device, anywhere.</p>
                </div>
                <div style={{ 
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' 
                }}>
                    {[
                        { icon: <Zap size={32} color="var(--primary-color)"/>, title: 'Instant Generation', desc: 'Create tests instantly from a massive pre-verified question bank.' },
                        { icon: <BookOpen size={32} color="var(--primary-color)"/>, title: 'Past Papers Integration', desc: 'Access and utilize official past papers directly within your custom tests.' },
                        { icon: <Shield size={32} color="var(--primary-color)"/>, title: 'Cloud Secured', desc: 'All your papers and institute data are backed up securely in the cloud.' },
                    ].map((feat, i) => (
                        <div key={i} className="glass slide-up" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', textAlign: 'left', animationDelay: `${i * 0.1}s` }}>
                            <div style={{ marginBottom: '1.5rem', background: 'var(--primary-light)', display: 'inline-block', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                                {feat.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{feat.title}</h3>
                            <p className="text-muted" style={{ lineHeight: 1.6 }}>{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Procedure */}
            <section style={{ padding: '6rem 5%' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>How Subscription Works</h2>
                    <p className="text-muted" style={{ fontSize: '1.1rem', marginTop: '1rem' }}>A seamless onboarding procedure for your institute.</p>
                </div>
                <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: '2rem', width: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>
                    {[
                        { step: 1, title: 'Register for Free', desc: 'Click "Get Started" to create a secure account for your institute. You automatically receive a Free plan with 10 free tests to evaluate our platform.' },
                        { step: 2, title: 'Generate Your First Test', desc: 'Experience the magic. Add your institute header, select subjects, pick questions, and watch the system generate a perfect PDF instantly.' },
                        { step: 3, title: 'Upgrade to Unlimited Pro', desc: 'Once you see the value and time saved, unlock unlimited testing capabilities and premium features by upgrading to a Pro subscription.' }
                    ].map((item, i) => (
                        <div key={i} className="slide-up" style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', position: 'relative', zIndex: 1, animationDelay: `${i * 0.2}s` }}>
                            <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', flexShrink: 0, boxShadow: '0 0 0 10px var(--bg-color)' }}>
                                {item.step}
                            </div>
                            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', flex: 1 }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.title}</h3>
                                <p className="text-muted" style={{ lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing / SaaS Model */}
            <section style={{ padding: '6rem 5%', backgroundColor: 'var(--card-bg)' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Simple, Transparent Pricing</h2>
                    <p className="text-muted" style={{ fontSize: '1.1rem', marginTop: '1rem' }}>No hidden setup fees. Upgrade when you are completely satisfied.</p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    
                    {/* Free Plan */}
                    <div className="glass slide-up" style={{ flex: '1 1 300px', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', borderTop: '4px solid var(--secondary-color)' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Trial Plan</h3>
                        <div style={{ fontSize: '3rem', fontWeight: '800', margin: '1rem 0' }}>$0<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}> / evaluate</span></div>
                        <p className="text-muted" style={{ marginBottom: '2rem' }}>Perfect for testing the platform before committing.</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['Up to 10 Tests', 'Basic Question Bank', 'Standard PDF Export', 'Community Support'].map((ft, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><CheckCircle color="var(--primary-color)" size={20} />{ft}</li>
                            ))}
                        </ul>
                        <Link to="/signup" className="btn btn-secondary" style={{ width: '100%' }}>Start Free Trial</Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="glass slide-up" style={{ flex: '1 1 300px', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', borderTop: '4px solid var(--primary-color)', transform: 'scale(1.05)', boxShadow: 'var(--shadow-lg)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Pro Subscription</h3>
                            <span style={{ background: 'var(--primary-light)', color: 'var(--primary-color)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}>BEST ROI</span>
                        </div>
                        <div style={{ fontSize: '3rem', fontWeight: '800', margin: '1rem 0' }}>Custom<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}> / month</span></div>
                        <p className="text-muted" style={{ marginBottom: '2rem' }}>Unlimited access for institutes serious about growing.</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['Up to 1000 Tests / month', 'Full AI Generation Support', 'Access to Past Papers', 'Custom Institute Branding', 'Priority Phone Support'].map((ft, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><CheckCircle color="var(--primary-color)" size={20} />{ft}</li>
                            ))}
                        </ul>
                        <Link to="/signup" className="btn" style={{ width: '100%' }}>Get Pro Status</Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '8rem 5%', textAlign: 'center', background: 'var(--primary-color)', color: 'white' }}>
                <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem' }}>Ready to Modernize Your Tests?</h2>
                <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                    Join other top institutes taking advantage of intelligent test generation. Set up your account in minutes.
                </p>
                <Link to="/signup" className="btn" style={{ background: 'white', color: 'var(--primary-color)', fontSize: '1.25rem', padding: '1rem 3rem', borderRadius: '999px' }}>
                    Create Your Account Now
                </Link>
            </section>

            {/* Footer */}
            <footer style={{ padding: '3rem 5%', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Shield size={20} />
                    <span style={{ fontWeight: 'bold' }}>Smart Test Generator SaaS</span>
                </div>
                <p>© {new Date().getFullYear()} Smart Test Generator. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
