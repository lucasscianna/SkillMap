import { useState } from 'react';

/**
 * TargetInput component.
 * Allows users to choose between targeting a job title or pasting a job description.
 * Styled using Tailwind utility classes matching the mockup design system.
 */
function TargetInput({ onSubmit, loading }) {
  const [activeTab, setActiveTab] = useState('title'); // 'title' | 'description'
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [company, setCompany] = useState('');
  const [timeline, setTimeline] = useState('mid'); // 'short' | 'mid' | 'long'

  const examples = [
    'Senior Frontend Engineer',
    'Product Manager',
    'DevOps Architect',
    'Data Scientist',
    'Full Stack Developer',
  ];

  const handleChipClick = (example) => {
    if (activeTab === 'title') {
      setJobTitle(example);
    } else {
      setJobDesc(`Looking for a ${example} with experience in modern web technologies, agile methodologies, and leading engineering teams.`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    let targetQuery = '';
    if (activeTab === 'title') {
      const companyPart = company.trim() ? ` at ${company.trim()}` : '';
      const timelineMap = {
        short: '3-6 months',
        mid: '6-12 months',
        long: '1-2 years',
      };
      targetQuery = `Job Title: ${jobTitle.trim()}${companyPart} (Target timeline: ${timelineMap[timeline]})`;
    } else {
      targetQuery = `Job Description:\n${jobDesc.trim()}`;
    }

    onSubmit(targetQuery);
  };

  return (
    <div className="w-full max-w-2xl bg-[#0f1628]/60 rounded-3xl border border-outline-variant/20 shadow-xl overflow-hidden glass-panel">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 border-b border-outline-variant/10">
        <h1 className="font-heading text-3xl font-bold text-on-surface mb-2">Define Your Goal</h1>
        <p className="font-sans text-sm text-on-surface-variant">
          Tell us what role or milestone you are targeting next.
        </p>
      </div>

      {/* Tabs */}
      <div className="mx-8 mt-6 bg-[#111927] p-1 rounded-xl flex border border-outline-variant/10">
        <button
          type="button"
          onClick={() => setActiveTab('title')}
          className={`flex-1 py-2 px-4 rounded-lg font-sans text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'title' ? 'bg-[#283048] text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Job Title
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('description')}
          className={`flex-1 py-2 px-4 rounded-lg font-sans text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'description' ? 'bg-[#283048] text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Job Description
        </button>
      </div>

      {/* Quick Examples */}
      <div className="px-8 mt-4">
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-outline-variant mr-2 block mb-2 sm:inline sm:mb-0">
          Try examples:
        </span>
        <div className="inline-flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => handleChipClick(ex)}
              className="px-3 py-1 rounded-full bg-[#111927] hover:bg-[#1c2540] border border-outline-variant/30 text-on-surface-variant hover:text-on-surface font-sans text-xs transition-colors cursor-pointer"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {activeTab === 'title' ? (
          <>
            {/* Target Title */}
            <div className="space-y-2">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant block" htmlFor="target-role">
                Target Role / Job Title
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-xl">work</span>
                </span>
                <input
                  className="custom-input focus:custom-input-focus block w-full pl-12 pr-4 py-3.5 rounded-xl font-sans text-base placeholder-outline-variant"
                  id="target-role"
                  placeholder="e.g. Senior Frontend Engineer, UX Manager"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                  type="text"
                />
              </div>
            </div>

            {/* Target Company / Context */}
            <div className="space-y-2">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant block" htmlFor="target-context">
                Target Company or Industry (Optional)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-xl">corporate_fare</span>
                </span>
                <input
                  className="custom-input focus:custom-input-focus block w-full pl-12 pr-4 py-3.5 rounded-xl font-sans text-base placeholder-outline-variant"
                  id="target-context"
                  placeholder="e.g. Google, Tech Startup, Healthcare"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  type="text"
                />
              </div>
            </div>

            {/* Timeline Selection */}
            <div className="space-y-2">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant block">
                Target Timeline
              </label>
              <div className="grid grid-cols-3 gap-4">
                <label
                  onClick={() => setTimeline('short')}
                  className={`border rounded-xl p-4 flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    timeline === 'short'
                      ? 'border-primary-container/80 bg-primary-container/10'
                      : 'border-outline-variant/40 hover:border-primary-container/60 hover:bg-[#151d35]'
                  }`}
                >
                  <input className="sr-only" name="timeline" type="radio" value="short" checked={timeline === 'short'} readOnly />
                  <span className="font-sans text-base font-semibold text-on-surface">3-6 Months</span>
                  <span className="font-sans text-xs text-on-surface-variant">Immediate</span>
                </label>
                <label
                  onClick={() => setTimeline('mid')}
                  className={`border rounded-xl p-4 flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    timeline === 'mid'
                      ? 'border-primary-container/80 bg-primary-container/10'
                      : 'border-outline-variant/40 hover:border-primary-container/60 hover:bg-[#151d35]'
                  }`}
                >
                  <input className="sr-only" name="timeline" type="radio" value="mid" checked={timeline === 'mid'} readOnly />
                  <span className="font-sans text-base font-semibold text-on-surface">6-12 Months</span>
                  <span className="font-sans text-xs text-on-surface-variant">Recommended</span>
                </label>
                <label
                  onClick={() => setTimeline('long')}
                  className={`border rounded-xl p-4 flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    timeline === 'long'
                      ? 'border-primary-container/80 bg-primary-container/10'
                      : 'border-outline-variant/40 hover:border-primary-container/60 hover:bg-[#151d35]'
                  }`}
                >
                  <input className="sr-only" name="timeline" type="radio" value="long" checked={timeline === 'long'} readOnly />
                  <span className="font-sans text-base font-semibold text-on-surface">1-2 Years</span>
                  <span className="font-sans text-xs text-on-surface-variant">Long-term</span>
                </label>
              </div>
            </div>
          </>
        ) : (
          /* Textarea for Job Description */
          <div className="space-y-2">
            <label className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant block" htmlFor="target-desc">
              Paste Job Description
            </label>
            <textarea
              className="custom-input focus:custom-input-focus block w-full px-4 py-3.5 rounded-xl font-sans text-base placeholder-outline-variant h-48 resize-none"
              id="target-desc"
              placeholder="Paste the requirements, skills, and details of the job listing you target..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              required
            ></textarea>
          </div>
        )}

        {/* Action button */}
        <div className="pt-4 flex flex-col gap-3">
          <button
            className="w-full bg-gradient-btn text-white font-sans text-base font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-[0.98]"
            type="submit"
            disabled={loading}
          >
            ⚡ Analyze my skill gap
          </button>
          <span className="text-center font-sans text-xs text-outline-variant block">
            Powered by Gemini Flash · Results in ~10 seconds
          </span>
        </div>
      </form>
    </div>
  );
}

export default TargetInput;
