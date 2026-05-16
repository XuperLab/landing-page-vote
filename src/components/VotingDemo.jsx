import { useState, useCallback } from 'react';
import './VotingDemo.css';

const INITIAL_OPTIONS = [
  { id: 1, icon: '⚡', label: 'VS Code', votes: 42 },
  { id: 2, icon: '💻', label: 'Neovim', votes: 28 },
  { id: 3, icon: '🛠️', label: 'JetBrains', votes: 35 },
  { id: 4, icon: '📝', label: 'Sublime Text', votes: 15 },
];

export default function VotingDemo() {
  const [options, setOptions] = useState(INITIAL_OPTIONS);
  const [votedId, setVotedId] = useState(null);
  const [justVoted, setJustVoted] = useState(false);

  const total = options.reduce((sum, o) => sum + o.votes, 0);
  const max = Math.max(...options.map(o => o.votes));

  const handleVote = useCallback((id) => {
    if (votedId !== null) return;
    setOptions(prev => prev.map(o =>
      o.id === id ? { ...o, votes: o.votes + 1 } : o
    ));
    setVotedId(id);
    setJustVoted(true);
    setTimeout(() => setJustVoted(false), 2000);
  }, [votedId]);

  const handleReset = useCallback(() => {
    setOptions(INITIAL_OPTIONS);
    setVotedId(null);
    setJustVoted(false);
  }, []);

  return (
    <section className="section vote-section" id="vote">
      <div className="section-header">
        <h2>See It in Action</h2>
        <p>Try the live poll below. Vote for your favorite code editor and watch the results animate in real-time.</p>
      </div>

      <div className="vote-container">
        <div className="vote-heading">
          <h3>🏆 Best Code Editor</h3>
          <span className="vote-total">{total} votes</span>
        </div>

        <div className="vote-options">
          {options.map(opt => {
            const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
            const isWinner = opt.votes === max && votedId !== null;
            return (
              <div
                key={opt.id}
                className={`vote-option ${votedId ? 'voted' : ''} ${isWinner ? 'winning' : ''}`}
                onClick={() => handleVote(opt.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleVote(opt.id)}
              >
                <div className="vote-bar" style={{ width: `${pct}%` }} />
                <span className="vote-icon">{opt.icon}</span>
                <span className="vote-label">{opt.label}</span>
                <span className="vote-count">{opt.votes}</span>
                <span className="vote-pct">{pct}%</span>
              </div>
            );
          })}
        </div>

        <div className="vote-footer">
          <span className="vote-message">
            {justVoted
              ? '✅ Vote recorded! Thanks for participating.'
              : votedId
                ? '👀 You can only vote once — results are live.'
                : '💡 Click an option to cast your vote.'}
          </span>
          <button className="vote-reset" onClick={handleReset}>
            ↻ Reset
          </button>
        </div>
      </div>
    </section>
  );
}
