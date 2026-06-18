import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * HistoryPage component.
 * Displays a list of past career analyses in a grid with filtering options.
 */
function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'month', 'high'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  /**
   * Fetch analysis history from backend.
   */
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('skillmap_token');
      if (!token) {
        navigate('/');
        return;
      }

      const res = await fetch('/api/analysis/history', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('skillmap_token');
          navigate('/');
          return;
        }
        throw new Error('Failed to retrieve history');
      }

      const data = await res.json();
      setHistory(data);
    } catch (err) {
      setError(err.message || 'An error occurred while loading history.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Format ISO date string to readable format.
   * @param {string} dateStr ISO date string
   * @returns {string} e.g. "May 12, 2026"
   */
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  /**
   * Safe JSON parse utility.
   */
  const parseJson = (val) => {
    if (!val) return [];
    if (typeof val === 'object') return val;
    try {
      return JSON.parse(val);
    } catch (e) {
      return [];
    }
  };

  /**
   * Get total estimated weeks from the roadmap array.
   */
  const getEstimatedWeeks = (roadmapItems) => {
    let totalWeeks = 0;
    roadmapItems.forEach((item) => {
      // Find numbers in duration string (e.g. "2-3 weeks", "4 weeks")
      const matches = item.duration ? item.duration.match(/\d+/g) : null;
      if (matches) {
        // Average or take maximum if range
        const numbers = matches.map(Number);
        const maxWeeks = Math.max(...numbers);
        totalWeeks += maxWeeks;
      } else {
        totalWeeks += 2; // Fallback default
      }
    });
    return totalWeeks || 4; // default minimum
  };

  // Filter logic
  const filteredHistory = history.filter((item) => {
    const gaps = parseJson(item.gap_result);
    const createdDate = new Date(item.created_at);
    const now = new Date();

    if (filter === 'month') {
      return (
        createdDate.getMonth() === now.getMonth() &&
        createdDate.getFullYear() === now.getFullYear()
      );
    }

    if (filter === 'high') {
      // Show if there is at least one high priority gap
      return gaps.some((g) => g.priority === 'high' || g.priority === 'High');
    }

    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-on-surface mb-2">
            Analysis History
          </h1>
          <p className="font-sans text-sm text-on-surface-variant">
            View, track, and manage your past career roadmap computations.
          </p>
        </div>

        {/* Filters */}
        <div className="flex bg-surface2/50 border border-outline-variant/10 p-1 rounded-xl">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              filter === 'all'
                ? 'bg-primary text-white shadow-md'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('month')}
            className={`px-4 py-2 rounded-lg font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              filter === 'month'
                ? 'bg-primary text-white shadow-md'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setFilter('high')}
            className={`px-4 py-2 rounded-lg font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              filter === 'high'
                ? 'bg-primary text-white shadow-md'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            High Priority
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-error-container text-error rounded-xl border border-error/20 font-sans text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Analysis Blank Card */}
          <div
            onClick={() => navigate('/analysis')}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-outline-variant/30 hover:border-primary/50 bg-surface/30 hover:bg-surface/50 cursor-pointer transition-all duration-300 group min-h-[260px] text-center"
          >
            <div className="w-12 h-12 rounded-full bg-primary-container/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-[24px]">add</span>
            </div>
            <h3 className="font-heading text-lg font-semibold text-on-surface mb-2">
              New Analysis
            </h3>
            <p className="font-sans text-xs text-on-surface-variant max-w-[200px]">
              Identify gap roadmap for another target career role.
            </p>
          </div>

          {/* List existing history cards */}
          {filteredHistory.map((item) => {
            const gaps = parseJson(item.gap_result);
            const roadmap = parseJson(item.roadmap);
            const weeks = getEstimatedWeeks(roadmap);

            return (
              <div
                key={item.id}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:scale-[1.01] hover:border-primary-container/20 transition-all duration-300 min-h-[260px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-sans text-xs text-on-surface-variant">
                      {formatDate(item.created_at)}
                    </span>
                    <span className="font-sans text-xs font-semibold px-2.5 py-1 rounded-full bg-surface2 text-on-surface border border-outline-variant/10">
                      {weeks} weeks est.
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-on-surface mb-3 line-clamp-2">
                    {item.target_input}
                  </h3>

                  {/* Gaps list priorities tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {gaps.slice(0, 3).map((gap, idx) => {
                      const prio = (gap.priority || 'low').toLowerCase();
                      let badgeColor = 'bg-green/10 text-green border-green/20';
                      if (prio === 'high') {
                        badgeColor = 'bg-red/10 text-red border-red/20';
                      } else if (prio === 'medium') {
                        badgeColor = 'bg-yellow/10 text-yellow border-yellow/20';
                      }

                      return (
                        <span
                          key={idx}
                          className={`font-sans text-[10px] font-semibold px-2 py-0.5 rounded-md border ${badgeColor}`}
                        >
                          {gap.skill}
                        </span>
                      );
                    })}
                    {gaps.length > 3 && (
                      <span className="font-sans text-[10px] text-on-surface-variant px-2 py-0.5">
                        +{gaps.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4 mt-auto">
                  <span className="font-sans text-xs text-on-surface-variant">
                    {roadmap.length} items to study
                  </span>
                  <button
                    onClick={() => navigate(`/results/${item.id}`)}
                    className="flex items-center gap-1.5 font-sans text-xs font-bold text-primary hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    View
                    <span className="material-symbols-outlined text-[14px]">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HistoryPage;
