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

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchTopWineByKey, type WineRecommendation } from '@/lib/wineService';
import { BackButton } from './BackButton';
import { useHelenaDialogue } from '@/hooks/useHelenaDialogue';
import { HelenaSpeechBubble } from '@/components/Helena';

interface ResultViewProps {
  wineName: string;
  wineKey?: string;
  blurb?: string;
  showMostExpensive?: boolean;
  onRestart: () => void;
  onBack?: () => void;
}

export const ResultView = ({ wineName, wineKey, blurb, showMostExpensive, onRestart, onBack }: ResultViewProps) => {
  const helena = useHelenaDialogue({ context: 'result' });

  const { data: recommendation, isLoading: loading, error } = useQuery({
    queryKey: ['wine', wineKey, showMostExpensive],
    queryFn: () => fetchTopWineByKey(wineKey!, showMostExpensive),
    enabled: !!wineKey,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const row = recommendation?.wine;
  const isAlternative = recommendation?.isAlternative || false;
  const specificWineName = row?.wines_master?.name;
  const displayPrice = useMemo(() => {
    if (!row) return null;
    if (row.specific_price != null) return `£${Number(row.specific_price).toFixed(2)}`;
    return null;
  }, [row]);

  return (
    <div className="animate-fade-in">
      {onBack && (
        <div className="text-left">
          <BackButton onClick={onBack} />
        </div>
      )}
      {/* Christmas themed icon */}
      <div className="mb-6">
        <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-4xl">🎄</span>
        </div>
      </div>

      {/* Result heading */}
      <h2 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide text-center">
        Your Perfect Match
      </h2>

      {/* Wine category - large and prominent */}
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight text-center">
        {wineName}
      </h1>

      {/* Alternative message */}
      {isAlternative && (
        <div className="mb-4 px-4">
          <p className="text-base md:text-lg text-primary font-medium leading-relaxed text-justify">
            But we're not made of money, so try this one
          </p>
        </div>
      )}

      {/* Wine description */}
      {!isAlternative && blurb && (
        <div className="mb-6 px-4">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-justify">
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
        <p className="text-sm text-destructive mb-6 text-justify">{error instanceof Error ? error.message : 'Failed to load wine details'}</p>
      ) : row && specificWineName && helena.shouldShow ? (
        <div className="mb-8">
          <HelenaSpeechBubble
            spriteVariant={helena.spriteVariant}
            showMagicalEffects={helena.showMagicalEffects}
          >
            <p className="text-base md:text-lg text-foreground leading-relaxed" style={{ margin: 0 }}>
              I recommend{' '}
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
          </HelenaSpeechBubble>
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
