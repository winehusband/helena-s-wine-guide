/**
 * QuestionView Component
 * Pure presentational component for displaying a question with multiple choice options
 *
 * Props:
 * - question: string - The question text to display
 * - options: Array of { label: string; onClick: () => void } - The answer options
 */

import { memo } from 'react';
import { BackButton } from './BackButton';

interface QuestionOption {
  label: string;
  onClick: () => void;
}

interface QuestionViewProps {
  question: string;
  options: QuestionOption[];
  onBack?: () => void;
}

export const QuestionView = memo(({ question, options, onBack }: QuestionViewProps) => {
  return (
    <div className="animate-fade-in">
      {onBack && <BackButton onClick={onBack} />}
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 leading-relaxed text-justify">
        {question}
      </h2>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={option.onClick}
            className="w-full px-6 py-4 bg-panel-soft hover:bg-primary hover:text-primary-foreground
                     text-foreground font-medium rounded-full transition-all duration-300
                     hover:scale-[1.02] hover:shadow-md text-justify border-2 border-transparent
                     hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary
                     focus:ring-offset-2 focus:ring-offset-background"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
});
