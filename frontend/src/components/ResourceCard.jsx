/**
 * ResourceCard component.
 * Displays a single learning resource (course, project, or reading) suggested by Gemini Flash.
 * Styled using Tailwind utility classes matching the mockup.
 */
function ResourceCard({ resource }) {
  const typeColors = {
    course: 'bg-primary-container/10 text-primary border border-primary-container/30',
    project: 'bg-secondary-container/10 text-secondary border border-secondary-container/30',
    reading: 'bg-[#2dd4a0]/10 text-[#2dd4a0] border border-[#2dd4a0]/30',
  };

  const typeLabels = {
    course: 'COURSE',
    project: 'PROJECT',
    reading: 'READING',
  };

  return (
    <div className="bg-[#111927]/60 border border-outline-variant/20 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/30 transition-all shadow-sm">
      <div className="flex flex-col gap-2">
        {/* Resource Type Badge */}
        <span className={`inline-self-start self-start px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider ${typeColors[resource.type] || typeColors.course}`}>
          {typeLabels[resource.type] || 'RESOURCE'}
        </span>

        {/* Title */}
        <h4 className="font-sans text-base font-bold text-on-surface">
          {resource.title}
        </h4>
        
        {/* Associated Skill */}
        {resource.skill && (
          <span className="font-sans text-xs text-on-surface-variant">
            Skill: <span className="text-primary font-semibold">{resource.skill}</span>
          </span>
        )}
      </div>

      {/* External Link Button */}
      <a
        href={resource.url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#1c2540] hover:bg-[#283048] border border-outline-variant/40 rounded-lg text-on-surface hover:text-white font-sans text-sm transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
        Explore
      </a>
    </div>
  );
}

export default ResourceCard;
