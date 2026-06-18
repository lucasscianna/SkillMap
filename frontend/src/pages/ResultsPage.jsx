import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import RoadmapDisplay from '../components/RoadmapDisplay';
import { getAnalysis } from '../services/api';

/**
 * ResultsPage component.
 * Displays the detailed career gap analysis results including match percentage, roadmap timeline, and learning resources.
 */
function ResultsPage() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const data = await getAnalysis(id);
        setAnalysis(data);
      } catch (err) {
        setError('Failed to load analysis results. Please verify if it exists and belongs to you.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [id]);

  // Extract clean title from target input string
  const getCleanTargetTitle = (input = '') => {
    if (input.startsWith('Job Title: ')) {
      return input.split('Job Title: ')[1].split(' (Target')[0].split(' at ')[0];
    }
    if (input.startsWith('Job Description:')) {
      return 'Target Job Description';
    }
    return input;
  };

  // Extract company if specified
  const getTargetCompany = (input = '') => {
    if (input.includes(' at ')) {
      return input.split(' at ')[1].split(' (Target')[0];
    }
    return 'Not Specified';
  };

  // Helper to calculate match percentage based on gaps
  const getMatchPercentage = (gaps = []) => {
    if (gaps.length === 0) return 100;
    const totalgaps = gaps.length;
    const highGaps = gaps.filter((g) => g.priority === 'high').length;
    const mediumGaps = gaps.filter((g) => g.priority === 'medium').length;

    // Weight gaps: High = 20% penalty, Medium = 10% penalty, Low = 3% penalty
    let penalty = highGaps * 25 + mediumGaps * 12 + (totalgaps - highGaps - mediumGaps) * 4;
    let score = 100 - penalty;
    return Math.max(Math.min(score, 98), 15); // Clamp between 15% and 98%
  };

  const getConfidenceScore = (gaps = []) => {
    if (gaps.length === 0) return 'High (99%)';
    if (gaps.length < 3) return 'High (88%)';
    if (gaps.length < 6) return 'Medium (72%)';
    return 'Moderate (55%)';
  };

  return (
    <MainLayout>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-10">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="font-heading text-3xl font-bold text-on-surface mb-2">Analysis Results</h1>
            <p className="font-sans text-sm text-on-surface-variant">
              Here is your customized skill gap breakdown.
            </p>
          </div>
          <Link
            to="/analysis"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#111927] hover:bg-[#1c2540] border border-outline-variant/30 rounded-full text-on-surface font-sans text-xs uppercase tracking-wider font-semibold cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            New Analysis
          </Link>
        </div>

        {loading ? (
          <div className="text-center font-sans text-on-surface-variant text-base py-24">
            Loading analysis results...
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto text-center p-12 bg-red/10 border border-red/20 rounded-2xl">
            <p className="font-sans text-red mb-6">{error}</p>
            <Link
              to="/analysis"
              className="px-6 py-2.5 bg-primary text-white rounded-xl font-sans text-sm font-semibold hover:opacity-90 cursor-pointer"
            >
              Go to Goal Setting
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Match percentage & Detailed Roadmap */}
            <div className="lg:col-span-8 space-y-8">
              {/* Match Card */}
              {(() => {
                const matchPct = getMatchPercentage(analysis.gaps);
                const dashArray = 364.4;
                const dashOffset = dashArray - (dashArray * matchPct) / 100;

                return (
                  <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 bg-[#0f1628]/60">
                    <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          className="text-outline-variant/20"
                          stroke="currentColor"
                          strokeWidth="10"
                          fill="transparent"
                          r="58"
                          cx="72"
                          cy="72"
                        ></circle>
                        <circle
                          className="text-primary"
                          stroke="currentColor"
                          strokeWidth="10"
                          strokeDasharray={dashArray}
                          strokeDashoffset={dashOffset}
                          strokeLinecap="round"
                          fill="transparent"
                          r="58"
                          cx="72"
                          cy="72"
                        ></circle>
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="font-heading text-3xl font-extrabold text-on-surface">
                          {matchPct}%
                        </span>
                        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                          Match
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <h2 className="font-heading text-2xl font-bold text-on-surface mb-2">
                        {matchPct > 70
                          ? "You're exceptionally close!"
                          : matchPct > 45
                          ? "You're on the right track!"
                          : 'A great journey awaits you!'}
                      </h2>
                      <p className="font-sans text-sm text-on-surface-variant mb-4">
                        You have mapped {matchPct}% of the skills required for: {' '}
                        <strong className="text-on-surface font-semibold">
                          {getCleanTargetTitle(analysis.target_input)}
                        </strong>
                        .
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <span className="bg-primary-container/20 text-primary px-3 py-1 rounded-full font-sans text-xs font-semibold uppercase tracking-wider">
                          Ready to grow
                        </span>
                        <span className="bg-secondary-container/20 text-secondary px-3 py-1 rounded-full font-sans text-xs font-semibold uppercase tracking-wider">
                          Career Analysis
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Detailed Roadmap steps */}
              <RoadmapDisplay
                gaps={analysis.gaps}
                roadmap={analysis.roadmap}
                resources={analysis.resources}
                targetRole={getCleanTargetTitle(analysis.target_input)}
              />
            </div>

            {/* Right Column: Profile details & actions */}
            <div className="lg:col-span-4 space-y-8">
              {/* Target Profile statistics */}
              <div className="glass-panel rounded-2xl p-6 bg-[#0f1628]/60">
                <h3 className="font-heading text-lg font-bold text-on-surface mb-4">
                  Target Profile
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant block mb-1">
                      Target Role
                    </span>
                    <span className="font-sans text-base font-bold text-on-surface">
                      {getCleanTargetTitle(analysis.target_input)}
                    </span>
                  </div>
                  <div>
                    <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant block mb-1">
                      Company / Context
                    </span>
                    <span className="font-sans text-base font-bold text-on-surface">
                      {getTargetCompany(analysis.target_input)}
                    </span>
                  </div>
                  <div>
                    <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant block mb-1">
                      Confidence Score
                    </span>
                    <span className="font-sans text-base font-bold text-primary">
                      {getConfidenceScore(analysis.gaps)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommended Action Card */}
              <div className="glass-panel rounded-2xl p-6 bg-gradient-to-br from-surface-container-high to-surface-container">
                <h3 className="font-heading text-lg font-bold text-on-surface mb-3">
                  Start Your Training
                </h3>
                <p className="font-sans text-sm text-on-surface-variant mb-6">
                  Begin closing the skill gaps with curated resources suggested by our career expert.
                </p>
                <button
                  onClick={() => {
                    const firstStep = document.querySelector('.group');
                    if (firstStep) {
                      firstStep.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full bg-gradient-btn text-white font-sans text-sm font-semibold py-3.5 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Learning Path</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              {/* Export actions */}
              <div className="glass-panel rounded-2xl p-6 flex flex-col gap-3 bg-[#0f1628]/60">
                <Link
                  to={`/export/${id}`}
                  className="w-full bg-gradient-btn text-white font-sans text-sm font-semibold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
                  <span>Export & Share Roadmap</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default ResultsPage;
