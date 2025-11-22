/**
 * MessageView Component
 * Pure presentational component for displaying a message with a continue action
 * 
 * Props:
 * - message: string - The message text to display
 * - onNext: () => void - Callback when user wants to continue
 */

interface MessageViewProps {
  message: string;
  onNext: () => void;
}

export const MessageView = ({ message, onNext }: MessageViewProps) => {
  return (
    <div className="animate-fade-in text-center">
      <div className="mb-8">
        <p className="text-lg md:text-xl text-foreground leading-relaxed">
          {message}
        </p>
      </div>

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
};
