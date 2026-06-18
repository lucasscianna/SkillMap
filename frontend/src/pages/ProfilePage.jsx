import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import ProfileForm from '../components/ProfileForm';
import { getProfile, updateProfile } from '../services/api';

/**
 * ProfilePage component.
 * Layout containing the progress stepper, heading, and the ProfileForm component.
 */
function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        // 404 is normal for first time setups, otherwise set error
        if (err.response?.status !== 404) {
          setError('Failed to fetch profile. Please refresh the page.');
        }
      }
    };
    fetchProfile();
  }, []);

  const handleSaveProfile = async (formData) => {
    try {
      await updateProfile(formData);
      navigate('/analysis');
    } catch (err) {
      throw err;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-10">
        {/* Progress Stepper */}
        <div className="w-full max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-between relative">
            {/* Connector Line (Background) */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-variant -translate-y-1/2 z-0"></div>
            {/* Connector Line (Active Progress) */}
            <div className="absolute top-1/2 left-0 w-[33%] h-[2px] bg-primary -translate-y-1/2 z-0"></div>

            {/* Step 1: Account (Checked) */}
            <div className="flex flex-col items-center gap-2 relative z-10 group">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_15px_rgba(79,142,247,0.3)] transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-[20px]">check</span>
              </div>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface">Account</span>
            </div>

            {/* Step 2: Profile (Active) */}
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className="w-10 h-10 rounded-full bg-surface text-primary border-2 border-primary flex items-center justify-center shadow-[0_0_20px_rgba(79,142,247,0.2)]">
                <span className="font-sans text-xs font-semibold uppercase tracking-wider font-bold">2</span>
              </div>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-primary font-bold">Profile</span>
            </div>

            {/* Step 3: Target (Inactive) */}
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className="w-10 h-10 rounded-full bg-surface text-outline border-2 border-outline-variant flex items-center justify-center">
                <span className="font-sans text-xs font-semibold uppercase tracking-wider">3</span>
              </div>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Target</span>
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

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-on-surface mb-3">
            Build your professional profile
          </h2>
          <p className="font-sans text-lg text-on-surface-variant max-w-2xl mx-auto">
            Map your current expertise and historical data to unlock accurate growth trajectories.
          </p>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-red/10 border border-red/20 text-red text-sm">
            {error}
          </div>
        )}

        {/* Form component */}
        <ProfileForm initialData={profile} onSave={handleSaveProfile} />
      </div>
    </MainLayout>
  );
}

export default ProfilePage;
