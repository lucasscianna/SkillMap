import { useState } from 'react';

/**
 * ExportButton component.
 * Provides reusable buttons for exporting roadmaps to PDF and copying shareable links.
 * 
 * @param {Object} props
 * @param {string} props.analysisId The ID of the analysis
 * @param {string} [props.className] Optional wrapper className
 */
function ExportButton({ analysisId, className = '' }) {
  const [copied, setCopied] = useState(false);

  /**
   * Triggers the window print dialog.
   * Leverages browser print media rules to generate the PDF clean card.
   */
  const handleDownloadPDF = () => {
    window.print();
  };

  /**
   * Copies the shareable Results page link to clipboard.
   * Shows a temporary "Link copied!" indicator for 2 seconds.
   */
  const handleCopyLink = async () => {
    try {
      const shareUrl = `${window.location.origin}/results/${analysisId}`;
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Download PDF Button */}
      <button
        onClick={handleDownloadPDF}
        className="w-full bg-gradient-btn text-white font-sans text-sm font-semibold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
      >
        <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
        <span>Download PDF</span>
      </button>

      {/* Copy Link Button */}
      <div className="relative w-full">
        <button
          onClick={handleCopyLink}
          className="w-full bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container-high hover:border-outline-variant text-on-surface font-sans text-sm font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">
            {copied ? 'check' : 'share'}
          </span>
          <span>{copied ? 'Link Copied!' : 'Copy Shareable Link'}</span>
        </button>

        {copied && (
          <div className="absolute left-1/2 -translate-x-1/2 -top-12 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-lg animate-bounce pointer-events-none z-55">
            Link copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}

export default ExportButton;
