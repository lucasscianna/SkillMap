import { useState, useEffect } from 'react';

/**
 * ProfileForm component.
 * Allows users to edit their core capabilities, experience, and education.
 * Designed exactly like the mockup "Profile Setup".
 */
function ProfileForm({ initialData, onSave }) {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [role, setRole] = useState('');
  const [durationFrom, setDurationFrom] = useState('');
  const [durationTo, setDurationTo] = useState('');
  const [experienceDesc, setExperienceDesc] = useState('');
  const [education, setEducation] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Load initial data when available
  useEffect(() => {
    if (initialData) {
      if (Array.isArray(initialData.skills)) {
        setSkills(initialData.skills);
      }
      setEducation(initialData.education || '');

      // Parse experience if formatted as role/duration/desc
      const expText = initialData.experience || '';
      if (expText) {
        // Try parsing assuming a standard format or fallback to description
        const roleMatch = expText.match(/Role:\s*(.*)/);
        const durationMatch = expText.match(/Duration:\s*(.*)/);
        const descMatch = expText.match(/Responsibilities:\s*([\s\S]*)/);

        if (roleMatch || durationMatch || descMatch) {
          setRole(roleMatch ? roleMatch[1].trim() : '');
          const duration = durationMatch ? durationMatch[1].trim() : '';
          if (duration.includes(' to ')) {
            const [from, to] = duration.split(' to ');
            setDurationFrom(from);
            setDurationTo(to);
          } else {
            setDurationFrom(duration);
          }
          setExperienceDesc(descMatch ? descMatch[1].trim() : expText);
        } else {
          setExperienceDesc(expText);
        }
      }
    }
  }, [initialData]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Format experience into a structured text string
    const formattedExperience = `Role: ${role}\nDuration: ${durationFrom} to ${durationTo}\nResponsibilities: ${experienceDesc}`;

    try {
      await onSave({
        skills,
        education,
        experience: formattedExperience,
      });
      setMessage('Profile updated successfully.');
    } catch (err) {
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex flex-col gap-8">
      {message && (
        <div className={`p-4 rounded-xl text-sm ${message.includes('successfully') ? 'bg-green/10 border border-green/20 text-green' : 'bg-red/10 border border-red/20 text-red'}`}>
          {message}
        </div>
      )}

      {/* Skills Section */}
      <section className="relative bg-[#1a1f2d]/40 backdrop-blur-xl border border-outline-variant/20 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-primary">model_training</span>
          <h3 className="font-heading text-2xl font-bold text-on-surface">Core Capabilities</h3>
        </div>
        <div className="space-y-4">
          <p className="font-sans text-sm text-on-surface-variant">
            Add tags that best describe your current functional skills. These will anchor your baseline map.
          </p>
          <div className="bg-[#283048]/50 border border-outline-variant/30 rounded-xl p-4 flex flex-wrap gap-2 items-center min-h-[64px] focus-within:border-primary/50 focus-within:bg-[#283048] transition-colors">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e1320] text-on-surface border border-outline-variant/50 font-sans text-xs font-semibold uppercase tracking-wider group hover:border-primary/50 cursor-default transition-colors"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-outline-variant group-hover:text-error transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </span>
            ))}
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-[200px] bg-transparent border-none text-on-surface placeholder:text-outline focus:ring-0 px-2 py-1 outline-none font-sans text-base"
              placeholder="Type a skill and press enter..."
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative bg-[#1a1f2d]/40 backdrop-blur-xl border border-outline-variant/20 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-tertiary">work</span>
            <h3 className="font-heading text-2xl font-bold text-on-surface">Recent Experience</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Role / Company
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#283048]/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface font-sans text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant"
              placeholder="e.g. Executive Chef at The Azure Restaurant"
              required
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Duration
            </label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={durationFrom}
                onChange={(e) => setDurationFrom(e.target.value)}
                placeholder="MM/YYYY"
                className="flex-1 bg-[#283048]/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface font-sans text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                required
              />
              <span className="text-outline-variant">to</span>
              <input
                type="text"
                value={durationTo}
                onChange={(e) => setDurationTo(e.target.value)}
                placeholder="MM/YYYY or Present"
                className="flex-1 bg-[#283048]/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface font-sans text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                required
              />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Key Responsibilities & Impact
            </label>
            <textarea
              rows="4"
              value={experienceDesc}
              onChange={(e) => setExperienceDesc(e.target.value)}
              className="w-full bg-[#283048]/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface font-sans text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant resize-none"
              placeholder="Describe your achievements and main tasks..."
              required
            ></textarea>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="relative bg-[#1a1f2d]/40 backdrop-blur-xl border border-outline-variant/20 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-secondary">school</span>
          <h3 className="font-heading text-2xl font-bold text-on-surface">Education</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Degree / Institution
            </label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full bg-[#283048]/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface font-sans text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant/50"
              placeholder="e.g. Culinary Arts, Le Cordon Bleu"
              required
            />
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <div className="mt-8 flex items-center justify-end gap-4 pt-6 border-t border-outline-variant/20">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-full font-sans text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#508ff8] to-[#4d24c0] hover:opacity-90 transition-all shadow-lg shadow-primary-container/20 flex items-center gap-2 cursor-pointer"
        >
          {loading ? 'Saving...' : 'Save & Continue'}
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
