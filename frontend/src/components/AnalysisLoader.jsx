/**
 * AnalysisLoader component.
 * Loading overlay with a spinner and indicator text showing that Gemini Flash is analyzing the skills gap.
 */
function AnalysisLoader() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto">
      {/* Animated Spinner container */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center shadow-lg shadow-primary-container/20 animate-pulse mb-6">
        <span className="material-symbols-outlined text-white text-3xl animate-spin">
          sync
        </span>
      </div>

      <h2 className="font-heading text-2xl font-bold text-on-surface mb-2">
        Analyzing your skill gap...
      </h2>
      <p className="font-sans text-sm text-on-surface-variant mb-1">
        Aligning your current capabilities against target requirements.
      </p>
      <span className="font-sans text-xs font-semibold uppercase tracking-wider text-primary mt-4">
        Powered by Gemini Flash
      </span>
    </div>
  );
}

export default AnalysisLoader;
