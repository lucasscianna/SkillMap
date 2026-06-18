import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExportButton from '../components/ExportButton';
import { getAnalysis } from '../services/api';

/**
 * ExportPage component.
 * Renders a PDF style paper layout on a clean white background with side actions.
 */
function ExportPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('Alex Carter');

  useEffect(() => {
    const fetchAnalysisAndUser = async () => {
      try {
        const data = await getAnalysis(id);
        setAnalysis(data);

        // Decode token to extract user name
        const token = localStorage.getItem('skillmap_token');
        if (token) {
          try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              window.atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );
            const payload = JSON.parse(jsonPayload);
            if (payload.email) {
              const emailPrefix = payload.email.split('@')[0];
              const formattedName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
              setUsername(formattedName);
            }
          } catch (tokenErr) {
            console.error('Failed to decode token:', tokenErr);
          }
        }
      } catch (err) {
        setError('Failed to load analysis details for export.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisAndUser();
  }, [id]);

  const getCleanTargetTitle = (input = '') => {
    if (input.startsWith('Job Title: ')) {
      return input.split('Job Title: ')[1].split(' (Target')[0].split(' at ')[0];
    }
    if (input.startsWith('Job Description:')) {
      return 'Target Job Description';
    }
    return input;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-on-surface-variant">
        <span>Loading export preview...</span>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center p-8 bg-error-container text-error rounded-2xl border border-error/20">
        <p className="font-sans mb-6">{error || 'Analysis not found'}</p>
        <button
          onClick={() => navigate('/history')}
          className="px-6 py-2 bg-primary text-white rounded-xl font-sans text-sm font-semibold hover:opacity-90 cursor-pointer"
        >
          Back to History
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans p-6 md:p-12">
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-center max-w-5xl mx-auto no-print">
        <div>
          <h2 className="font-heading text-2xl font-bold text-on-surface mb-2">Export Roadmap</h2>
          <p className="font-sans text-sm text-on-surface-variant">
            Review and share your career progression plan.
          </p>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-start">
        {/* Left: Document Preview (Bento Item 1 - Large) */}
        <div className="lg:col-span-8 flex justify-center items-center p-6 bg-surface-container-low rounded-2xl border border-outline-variant/10 shadow-sm min-h-[600px] print-card">
          {/* PDF Style Paper */}
          <div className="bg-white text-surface-container-low w-full max-w-[600px] shadow-lg p-10 relative flex flex-col print-card border border-gray-200">
            {/* PDF Header */}
            <div className="flex justify-between items-start mb-8 border-b border-gray-300 pb-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 leading-tight">
                  Career Growth Roadmap
                </h3>
                <p className="font-sans text-xs text-gray-600 mt-2">
                  Prepared for: <span className="font-bold text-gray-800">{username}</span>
                </p>
                <p className="font-sans text-xs text-gray-600">
                  Target Role: <span className="font-bold text-gray-800">{getCleanTargetTitle(analysis.target_input)}</span>
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-heading text-sm font-black text-primary-container">
                  SkillMap<span className="text-secondary-container">.</span>
                </span>
                <span className="font-sans text-[10px] text-gray-500 mt-1">
                  {formatDate(analysis.created_at)}
                </span>
              </div>
            </div>

            {/* Gap Analysis Gaps Breakdown */}
            <div className="mb-8">
              <h4 className="font-heading text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                Identified Skill Gaps
              </h4>
              <div className="space-y-4">
                {analysis.gaps.map((gap, idx) => {
                  const prio = (gap.priority || 'low').toLowerCase();
                  let priorityLabel = 'Low Gap';
                  let badgeClass = 'bg-green/10 text-green border-green/20';
                  let dotColor = 'bg-green';
                  if (prio === 'high') {
                    priorityLabel = 'High Gap';
                    badgeClass = 'bg-red/10 text-red border-red/20';
                    dotColor = 'bg-red';
                  } else if (prio === 'medium') {
                    priorityLabel = 'Medium Gap';
                    badgeClass = 'bg-yellow/10 text-yellow border-yellow/20';
                    dotColor = 'bg-yellow';
                  }

                  return (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
                        <span className="font-sans font-semibold text-gray-800">{gap.skill}</span>
                      </div>
                      <span className={`font-sans text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badgeClass}`}>
                        {priorityLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Learning Roadmap Steps */}
            <div>
              <h4 className="font-heading text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                Roadmap Progression
              </h4>
              <div className="space-y-6">
                {analysis.roadmap.map((item, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-primary-container/20 last:border-0 pb-2">
                    <div className="absolute -left-1.5 top-1 w-2.5 h-2.5 rounded-full bg-primary-container"></div>
                    <span className="font-sans text-[10px] font-bold text-primary-container uppercase tracking-wider block mb-1">
                      {item.duration || '2 weeks'}
                    </span>
                    <h5 className="font-sans text-xs font-bold text-gray-800 mb-1">
                      {item.step}
                    </h5>
                    <p className="font-sans text-[11px] text-gray-600">
                      {item.topics ? item.topics.join(', ') : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* PDF Footer */}
            <div className="mt-12 pt-4 border-t border-gray-200 text-center">
              <p className="font-sans text-[9px] text-gray-400">
                Generated by SkillMap Career Gap AI. Map your current abilities to future ambitions.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Actions Bento controls (no-print) */}
        <div className="lg:col-span-4 flex flex-col gap-6 no-print">
          {/* Export Actions Panel */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">picture_as_pdf</span>
              <h3 className="font-heading text-lg font-bold text-on-surface">Export Document</h3>
            </div>
            <p className="font-sans text-sm text-on-surface-variant">
              Download a high-resolution PDF or copy the secure view-only link to share with mentors.
            </p>
            <ExportButton analysisId={id} className="mt-2" />
          </div>

          {/* Back Action button */}
          <button
            onClick={() => navigate(`/results/${id}`)}
            className="w-full border border-primary text-primary font-sans text-xs uppercase tracking-wider font-semibold py-3.5 rounded-full hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Analysis</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExportPage;
