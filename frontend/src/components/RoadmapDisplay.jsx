import ResourceCard from './ResourceCard';

/**
 * RoadmapDisplay component.
 * Displays a structured learning roadmap mapped out by priority levels.
 * Styled using Tailwind utility classes matching the mockup.
 */
function RoadmapDisplay({ gaps = [], roadmap = [], resources = [], targetRole = '' }) {
  // Group resources by skill
  const getResourcesForSkill = (skillName) => {
    return resources.filter(
      (r) => r.skill?.toLowerCase() === skillName?.toLowerCase()
    );
  };

  // Find priority level for a skill
  const getPriorityForSkill = (skillName) => {
    const gap = gaps.find((g) => g.skill?.toLowerCase() === skillName?.toLowerCase());
    return gap ? gap.priority : 'low';
  };

  const priorityColors = {
    high: {
      border: 'border-l-4 border-red',
      text: 'text-red',
      bg: 'bg-red/10',
      label: 'High Gap',
    },
    medium: {
      border: 'border-l-4 border-yellow',
      text: 'text-yellow',
      bg: 'bg-yellow/10',
      label: 'Medium Gap',
    },
    low: {
      border: 'border-l-4 border-green',
      text: 'text-green',
      bg: 'bg-green/10',
      label: 'Low/No Gap',
    },
  };

  // Sort roadmap items by order
  const sortedRoadmap = [...roadmap].sort((a, b) => (a.order || 0) - (b.order || 0));

  // Count priorities
  const highGapsCount = gaps.filter((g) => g.priority === 'high').length;
  const mediumGapsCount = gaps.filter((g) => g.priority === 'medium').length;
  const lowGapsCount = gaps.filter((g) => g.priority === 'low').length;

  return (
    <div className="space-y-6">
      {/* Gap Summary Bar */}
      <div className="glass-panel rounded-2xl p-6 bg-[#0f1628]/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant block mb-1">
            Targeting Role
          </span>
          <h2 className="font-heading text-2xl font-bold text-on-surface">
            {targetRole || 'Not specified'}
          </h2>
        </div>

        {/* Priority Counts */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red/10 border border-red/20">
            <span className="w-2 h-2 rounded-full bg-red"></span>
            <span className="font-sans text-xs font-semibold text-red">{highGapsCount} High Gaps</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow/10 border border-yellow/20">
            <span className="w-2 h-2 rounded-full bg-yellow"></span>
            <span className="font-sans text-xs font-semibold text-yellow">{mediumGapsCount} Medium Gaps</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green/10 border border-green/20">
            <span className="w-2 h-2 rounded-full bg-green"></span>
            <span className="font-sans text-xs font-semibold text-green">{lowGapsCount} Low Gaps</span>
          </div>
        </div>
      </div>

      {/* Roadmap List */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-8 bg-[#0f1628]/60">
        <h3 className="font-heading text-2xl font-bold text-on-surface mb-6">
          Personalized Growth Roadmap
        </h3>

        {sortedRoadmap.length === 0 ? (
          <p className="font-sans text-on-surface-variant text-base py-4 text-center">
            No roadmap steps generated yet.
          </p>
        ) : (
          <div className="relative border-l border-outline-variant/30 ml-4 pl-6 space-y-8">
            {sortedRoadmap.map((item, index) => {
              const priority = getPriorityForSkill(item.skill);
              const config = priorityColors[priority] || priorityColors.low;
              const skillResources = getResourcesForSkill(item.skill);

              return (
                <div key={item.skill + '-' + index} className="relative group">
                  {/* Step Timeline Indicator Circle */}
                  <span className="absolute -left-[35px] top-1.5 w-[18px] h-[18px] rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                  </span>

                  {/* Skill Card */}
                  <div className={`p-5 rounded-xl bg-[#111927]/40 border border-outline-variant/20 shadow-sm transition-colors hover:border-primary/20 ${config.border}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-base font-extrabold text-outline-variant">
                          STEP {item.order || index + 1}
                        </span>
                        <h4 className="font-heading text-lg font-bold text-on-surface">
                          {item.skill}
                        </h4>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded font-sans text-xs font-semibold uppercase tracking-wider ${config.bg} ${config.text}`}>
                          {config.label}
                        </span>
                        <span className="flex items-center gap-1 font-sans text-xs text-on-surface-variant">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          {item.duration || '2 weeks'}
                        </span>
                      </div>
                    </div>

                    {/* Resources for this skill */}
                    {skillResources.length > 0 && (
                      <div className="mt-4 space-y-3 pt-4 border-t border-outline-variant/10">
                        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant block">
                          Suggested Resources
                        </span>
                        {skillResources.map((res, rIdx) => (
                          <ResourceCard key={rIdx} resource={res} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default RoadmapDisplay;
