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

import { useEffect, useMemo, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchTopWineByKey, type WineRecommendation } from '@/lib/wineService';

interface ResultViewProps {
  wineName: string;
  wineKey?: string;
  blurb?: string;
  onRestart: () => void;
  onBack?: () => void;
}

export const ResultView = ({ wineName, wineKey, blurb, onRestart, onBack }: ResultViewProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<WineRecommendation | null>(null);

  useEffect(() => {
    let active = true;
    async function run() {
      if (!wineKey) return;
      setLoading(true);
      setError(null);
      try {
        const result = await fetchTopWineByKey(wineKey);
        if (active) setRecommendation(result);
      } catch (e: any) {
        if (active) setError(e?.message || 'Failed to load wine details');
      } finally {
        if (active) setLoading(false);
      }
    }
    run();
    return () => { active = false; };
  }, [wineKey]);

  const row = recommendation?.wine;
  const isAlternative = recommendation?.isAlternative || false;
  const specificWineName = row?.wines_master?.name;
  const displayPrice = useMemo(() => {
    if (!row) return null;
    if (row.specific_price != null) return `£${Number(row.specific_price).toFixed(2)}`;
    return null;
  }, [row]);

  return (
    <div className="animate-fade-in text-center">
      {onBack && (
        <div className="text-left">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground 
                     hover:text-foreground transition-colors mb-6 focus:outline-none 
                     focus:ring-2 focus:ring-primary focus:ring-offset-2 
                     focus:ring-offset-background rounded-full px-3 py-1"
          >
            Back
          </button>
        </div>
      )}
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

      {/* Wine category - large and prominent */}
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        {wineName}
      </h1>

      {/* Alternative message */}
      {isAlternative && (
        <div className="mb-4 px-4">
          <p className="text-base md:text-lg text-primary font-medium leading-relaxed">
            But we're not made of money, so try this one
          </p>
        </div>
      )}

      {/* Wine description */}
      {!isAlternative && blurb && (
        <div className="mb-6 px-4">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {blurb}
          </p>
        </div>
      )}

      {/* Helena's recommendation */}
      {loading ? (
        <div className="flex flex-col items-center gap-3 mb-8">
          <Skeleton className="h-6 w-64" />
        </div>
      ) : error ? (
        <p className="text-sm text-destructive mb-6">{error}</p>
      ) : row && specificWineName ? (
        <div className="mb-8 px-4">
          <p className="text-base md:text-lg text-foreground leading-relaxed">
            Helena recommends{' '}
            <span className="font-semibold">{specificWineName}</span>
            {row.purchased_from_store && (
              <>
                {' '}from <span className="font-medium">{row.purchased_from_store}</span>
              </>
            )}
            {displayPrice && (
              <>
                {' '}for <span className="font-semibold">{displayPrice}</span>
              </>
            )}
          </p>
        </div>
      ) : null}

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
