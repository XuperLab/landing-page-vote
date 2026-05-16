import { useState, useCallback } from 'react';
import './VotingDemo.css';

const TOAST_DURATION = 2000;

const POLLS = [
  {
    id: 'editors',
    title: '🏆 Best Code Editor',
    options: [
      { id: 1, icon: '⚡', label: 'VS Code', votes: 42 },
      { id: 2, icon: '💻', label: 'Neovim', votes: 28 },
      { id: 3, icon: '🛠️', label: 'JetBrains', votes: 35 },
      { id: 4, icon: '📝', label: 'Sublime Text', votes: 15 },
    ],
  },
  {
    id: 'frameworks',
    title: '⚛️ Favorite Framework',
    options: [
      { id: 1, icon: '⚛️', label: 'React', votes: 55 },
      { id: 2, icon: '🟢', label: 'Vue', votes: 32 },
      { id: 3, icon: '🔥', label: 'Svelte', votes: 28 },
      { id: 4, icon: '🟦', label: 'Solid', votes: 14 },
    ],
  },
  {
    id: 'databases',
    title: '🗄️ Preferred Database',
    options: [
      { id: 1, icon: '🐘', label: 'PostgreSQL', votes: 48 },
      { id: 2, icon: '📦', label: 'SQLite', votes: 30 },
      { id: 3, icon: '🍃', label: 'MongoDB', votes: 22 },
      { id: 4, icon: '📀', label: 'Redis', votes: 18 },
    ],
  },
];

export default function VotingDemo() {
  const [activePoll, setActivePoll] = useState(POLLS[0].id);
  const [voteState, setVoteState] = useState(() => {
    const initial = {};
    POLLS.forEach(p => { initial[p.id] = { votedId: null, justVoted: false }; });
    return initial;
  });
  const [optionVotes, setOptionVotes] = useState(() => {
    const initial = {};
    POLLS.forEach(p => {
      initial[p.id] = p.options.map(o => ({ ...o }));
    });
    return initial;
  });

  const [showToast, setShowToast] = useState(false);

  const currentPoll = POLLS.find(p => p.id === activePoll);
  const currentOptions = optionVotes[activePoll] || [];
  const currentVoteState = voteState[activePoll] || { votedId: null, justVoted: false };

  const total = currentOptions.reduce((sum, o) => sum + o.votes, 0);
  const max = Math.max(...currentOptions.map(o => o.votes));

  const handleVote = useCallback((id) => {
    if (currentVoteState.votedId !== null) return;

    setOptionVotes(prev => ({
      ...prev,
      [activePoll]: prev[activePoll].map(o =>
        o.id === id ? { ...o, votes: o.votes + 1 } : o
      ),
    }));

    setVoteState(prev => ({
      ...prev,
      [activePoll]: { votedId: id, justVoted: true },
    }));

    setTimeout(() => {
      setVoteState(prev => ({
        ...prev,
        [activePoll]: { ...prev[activePoll], justVoted: false },
      }));
    }, 2000);
  }, [activePoll, currentVoteState.votedId]);

  const handleReset = useCallback(() => {
    setOptionVotes(prev => ({
      ...prev,
      [activePoll]: POLLS.find(p => p.id === activePoll).options.map(o => ({ ...o })),
    }));
    setVoteState(prev => ({
      ...prev,
      [activePoll]: { votedId: null, justVoted: false },
    }));
  }, [activePoll]);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), TOAST_DURATION);
    } catch {
      // Clipboard not available — silently fail
    }
  }, []);

  const handleTabChange = useCallback((pollId) => {
    setActivePoll(pollId);
  }, []);

  return (
    <section className="section vote-section" id="vote">
      <div className="section-header">
        <h2>See It in Action</h2>
        <p>Try the live polls below. Vote once per category and watch results animate in real-time.</p>
      </div>

      <div className="vote-container">
        <div className="poll-tabs">
          {POLLS.map(poll => (
            <button
              key={poll.id}
              className={`poll-tab ${activePoll === poll.id ? 'poll-tab-active' : ''}`}
              onClick={() => handleTabChange(poll.id)}
              aria-pressed={activePoll === poll.id}
            >
              {poll.title}
            </button>
          ))}
        </div>

        <div className="vote-heading">
          <h3>{currentPoll?.title}</h3>
          <span className="vote-total">{total} votes</span>
        </div>

        <div className="vote-options" key={activePoll}>
          {currentOptions.map(opt => {
            const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
            const isWinner = opt.votes === max && currentVoteState.votedId !== null;
            return (
              <div
                key={opt.id}
                className={`vote-option ${currentVoteState.votedId ? 'voted' : ''} ${isWinner ? 'winning' : ''}`}
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
            {currentVoteState.justVoted
              ? '✅ Vote recorded! Thanks for participating.'
              : currentVoteState.votedId
                ? '👀 You can only vote once — results are live.'
                : '💡 Click an option to cast your vote.'}
          </span>
          <div className="vote-footer-actions">
            <button className="vote-share" onClick={handleShare} title="Share this poll">
              🔗 Share
            </button>
            <button className="vote-reset" onClick={handleReset}>
              ↻ Reset
            </button>
          </div>
        </div>
        {showToast && <div className="vote-toast">✅ Link copied!</div>}
      </div>
    </section>
  );
}
