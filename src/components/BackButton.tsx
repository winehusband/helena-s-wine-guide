import { memo } from 'react';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

export const BackButton = memo(({ onClick, className = '' }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-sm font-medium text-muted-foreground
                 hover:text-foreground transition-colors mb-6 focus:outline-none
                 focus:ring-2 focus:ring-primary focus:ring-offset-2
                 focus:ring-offset-background rounded-full px-3 py-1 ${className}`}
    >
      Back
    </button>
  );
});
