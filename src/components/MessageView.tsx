/**
 * MessageView Component
 * Pure presentational component for displaying a message with a continue action
 *
 * Props:
 * - message: string - The message text to display
 * - onNext: () => void - Callback when user wants to continue
 */

import { memo } from 'react';
import { BackButton } from './BackButton';
import { useHelenaDialogue } from '@/hooks/useHelenaDialogue';
import { HelenaSpeechBubble } from '@/components/Helena';

interface MessageViewProps {
  message: string;
  nodeId?: string;
  onNext: () => void;
  onBack?: () => void;
}

export const MessageView = memo(({ message, nodeId, onNext, onBack }: MessageViewProps) => {
  const helena = useHelenaDialogue({
    context: 'message',
    nodeId,
    customMessage: message,
  });

  return (
    <div className="animate-fade-in">
      {onBack && (
        <div className="text-left">
          <BackButton onClick={onBack} />
        </div>
      )}

      {/* Helena delivers the message */}
      {helena.shouldShow ? (
        <div className="mb-8">
          <HelenaSpeechBubble
            message={helena.message}
            spriteVariant={helena.spriteVariant}
            position={helena.position}
          />
        </div>
      ) : (
        <div className="mb-8">
          <p className="text-lg md:text-xl text-foreground leading-relaxed text-justify">
            {message}
          </p>
        </div>
      )}

      <button
        onClick={onNext}
        className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground 
                 font-semibold rounded-full transition-all duration-300 hover:scale-105 
                 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary 
                 focus:ring-offset-2 focus:ring-offset-background"
      >
        Next
      </button>
    </div>
  );
});
