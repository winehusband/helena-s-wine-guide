/**
 * ResultView Component
 * Pure presentational component for displaying the final wine recommendation
 * 
 * Props:
 * - wineName: string - Name of the recommended wine
 * - blurb?: string - Optional description/fun copy about the wine
 * - onRestart: () => void - Callback to restart the flow
 * 
 * NOTE FOR CODEX: This is where you'll plug in:
 * - wineKey from the flow engine
 * - Supabase fetch to get real wine data
 * - Replace wineName and blurb with actual wine details
 */

interface ResultViewProps {
  wineName: string;
  blurb?: string;
  onRestart: () => void;
}

export const ResultView = ({ wineName, blurb, onRestart }: ResultViewProps) => {
  return (
    <div className="animate-fade-in text-center">
      {/* Wine glass or bottle icon placeholder */}
      <div className="mb-6">
        <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-4xl">🍷</span>
        </div>
      </div>

      {/* Result heading */}
      <h2 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
        Your Perfect Match
      </h2>

      {/* Wine name - large and prominent */}
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        {wineName}
      </h1>

      {/* Wine description */}
      {blurb && (
        <div className="mb-8 px-4">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {blurb}
          </p>
        </div>
      )}

      {/* TODO FOR CODEX: Add wine details here
          - Image
          - Price
          - Tasting notes
          - Buy link
          - Add to wishlist
      */}

      {/* Start again button */}
      <button
        onClick={onRestart}
        className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground 
                 font-semibold rounded-full transition-all duration-300 hover:scale-105 
                 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary 
                 focus:ring-offset-2 focus:ring-offset-background"
      >
        Start Again
      </button>
    </div>
  );
};
