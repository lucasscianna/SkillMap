import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import TargetInput from '../components/TargetInput';
import AnalysisLoader from '../components/AnalysisLoader';
import { getProfile, createAnalysis } from '../services/api';

/**
 * AnalysisPage component.
 * Allows user to define target goals and triggers Gemini Flash career gap analysis.
 */
function AnalysisPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Please complete your profile first');
        } else {
          setError('Failed to fetch profile details.');
        }
      } finally {
        setPageLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleStartAnalysis = async (targetQuery) => {
    setLoading(true);
    setError('');
    try {
      const result = await createAnalysis(targetQuery);
      navigate(`/results/${result.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate analysis. Please try again.');
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        {/* Progress Stepper */}
        <div className="w-full max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-between relative">
            {/* Connector Line (Background) */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-variant -translate-y-1/2 z-0"></div>
            {/* Connector Line (Active Progress) */}
            <div className="absolute top-1/2 left-0 w-[66%] h-[2px] bg-primary -translate-y-1/2 z-0"></div>

            {/* Step 1: Account (Checked) */}
            <div className="flex flex-col items-center gap-2 relative z-10 group">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_15px_rgba(79,142,247,0.3)] transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-[20px]">check</span>
              </div>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface">Account</span>
            </div>

            {/* Step 2: Profile (Checked) */}
            <div className="flex flex-col items-center gap-2 relative z-10 group">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_15px_rgba(79,142,247,0.3)] transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-[20px]">check</span>
              </div>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface">Profile</span>
            </div>

            {/* Step 3: Target (Active) */}
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className="w-10 h-10 rounded-full bg-surface text-primary border-2 border-primary flex items-center justify-center shadow-[0_0_20px_rgba(79,142,247,0.2)]">
                <span className="font-sans text-xs font-semibold uppercase tracking-wider font-bold">3</span>
              </div>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-primary font-bold">Target</span>
            </div>

            {/* Step 4: Results (Inactive) */}
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className="w-10 h-10 rounded-full bg-surface text-outline border-2 border-outline-variant flex items-center justify-center">
                <span className="font-sans text-xs font-semibold uppercase tracking-wider">4</span>
              </div>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Results</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="w-full max-w-2xl mb-8 p-4 rounded-xl bg-red/10 border border-red/20 text-red text-center font-sans text-sm">
            {error}
            {error.includes('profile') && (
              <button
                onClick={() => navigate('/profile')}
                className="block mx-auto mt-2 text-primary font-bold underline cursor-pointer"
              >
                Go to Profile Setup
              </button>
            )}
          </div>
        )}

        {pageLoading ? (
          <div className="text-center font-sans text-on-surface-variant text-base py-12">
            Loading profile baseline...
          </div>
        ) : loading ? (
          <AnalysisLoader />
        ) : (
          <div className="w-full flex flex-col items-center gap-8">
            {profile && (
              <div className="w-full max-w-2xl p-4 bg-surface/40 border border-outline-variant/10 rounded-2xl flex flex-wrap gap-2 items-center">
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Current baseline:
                </span>
                {profile.skills?.slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-surface-container-low border border-outline-variant/30 text-on-surface-variant font-sans text-xs rounded-lg uppercase tracking-wider font-semibold"
                  >
                    {skill}
                  </span>
                ))}
                {profile.skills?.length > 5 && (
                  <span className="text-xs text-outline font-sans">
                    +{profile.skills.length - 5} more
                  </span>
                )}
              </div>
            )}

            <TargetInput onSubmit={handleStartAnalysis} loading={loading} />
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default AnalysisPage;
