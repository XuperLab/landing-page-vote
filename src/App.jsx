import VotingDemo from './components/VotingDemo';
import ScrollProgress from './components/ScrollProgress';
import ThemeToggle from './components/ThemeToggle';
import AnimatedCounter from './components/AnimatedCounter';
import './App.css';

function App() {
  return (
    <div className="App">
      <ScrollProgress />
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-logo">CodeVote</span>
          <ul className="nav-links">
            <li><a href="#vote">Demo</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="https://github.com">GitHub</a></li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Live &bull; Real-time polls
        </div>
        <h1>
          Developer Polls <br />
          <span className="highlight">Made Simple</span>
        </h1>
        <p>
          Create, share, and vote on polls with your team in real-time.
          No sign-ups, no clutter — just instant feedback from the people
          who matter.
        </p>
        <div className="hero-actions">
          <a href="#vote" className="btn btn-primary">
            🗳️ Try the Demo
          </a>
          <a href="#features" className="btn btn-secondary">
            Learn More →
          </a>
        </div>
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number"><AnimatedCounter end={2847} /></div>
            <div className="stat-label">Polls Created</div>
          </div>
          <div className="stat-item">
            <div className="stat-number"><AnimatedCounter end={12430} />+</div>
            <div className="stat-label">Votes Cast</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime</div>
          </div>
        </div>
      </section>

      {/* Voting Demo */}
      <VotingDemo />

      {/* Features */}
      <section className="section" id="features">
        <div className="section-header">
          <h2>Everything You Need</h2>
          <p>Built for modern dev teams who value speed and simplicity.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Instant Polls</h3>
            <p>Create a poll in seconds with a simple link. No account required for voters — just click and vote.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <h3>Live Results</h3>
            <p>Results update in real-time as votes come in. Animated bars and percentages make the data pop.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <h3>One Vote per Person</h3>
            <p>Built-in vote gating prevents double-voting. Fair, transparent, and tamper-resistant.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🌐</span>
            <h3>Share Anywhere</h3>
            <p>Share polls via link, embed them in your docs or README, or drop them into Slack and Discord.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Mobile Ready</h3>
            <p>Fully responsive design works flawlessly on desktop, tablet, and phone. Vote from anywhere.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🆓</span>
            <h3>100% Free</h3>
            <p>No pricing tiers, no hidden fees, no credit card. Unlimited polls and votes, forever.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#vote">Demo</a>
          <a href="#features">Features</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="https://github.com">GitHub</a>
        </div>
        <p>© {new Date().getFullYear()} CodeVote. Built with React + Vite.</p>
      </footer>
    </div>
  );
}

export default App;
