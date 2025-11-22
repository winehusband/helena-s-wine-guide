/**
 * FlowWidget Component
 * Main container for the HelenaSips Wine Flow
 * 
 * CURRENT STATE: Uses local useState with hard-coded example nodes for demo
 * 
 * FOR CODEX: Replace the demo state management with:
 * - Import from /data/wineFlow.json
 * - Use /lib/flowEngine.ts helpers
 * - Connect node transitions to the JSON-driven state machine
 * - Wire up Supabase fetches in ResultView for real wine data
 */

import { useState } from 'react';
import { QuestionView } from './QuestionView';
import { MessageView } from './MessageView';
import { ResultView } from './ResultView';
import { ProgressBar } from './ProgressBar';
import { ArrowLeft } from 'lucide-react';

// Simple type definitions for demo
// FOR CODEX: These will match the types in /lib/types.ts
type NodeType = 'question' | 'message' | 'wine';

interface QuestionNode {
  type: 'question';
  id: string;
  text: string;
  options: { label: string; nextId: string }[];
}

interface MessageNode {
  type: 'message';
  id: string;
  text: string;
  nextId: string;
}

interface WineNode {
  type: 'wine';
  id: string;
  name: string;
  blurb?: string;
  // FOR CODEX: Add wineKey here for Supabase lookup
}

type FlowNode = QuestionNode | MessageNode | WineNode;

// Demo flow data
// FOR CODEX: This will be replaced by importing from /data/wineFlow.json
// and using flowEngine.ts to navigate the state machine
const DEMO_FLOW: FlowNode[] = [
  {
    type: 'message',
    id: 'welcome',
    text: "Hi there! I'm Helena. Let's find you a wine that matches your vibe today.",
    nextId: 'q1'
  },
  {
    type: 'question',
    id: 'q1',
    text: 'How are you feeling this evening?',
    options: [
      { label: 'Ready to unwind', nextId: 'q2a' },
      { label: 'Celebrating something special', nextId: 'q2b' },
      { label: 'Just browsing', nextId: 'q2c' }
    ]
  },
  {
    type: 'question',
    id: 'q2a',
    text: 'What sounds more appealing right now?',
    options: [
      { label: 'Something smooth and easy', nextId: 'wine1' },
      { label: 'Bold and interesting', nextId: 'wine2' }
    ]
  },
  {
    type: 'question',
    id: 'q2b',
    text: 'What kind of celebration?',
    options: [
      { label: 'Intimate dinner', nextId: 'wine3' },
      { label: 'Lively gathering', nextId: 'wine4' }
    ]
  },
  {
    type: 'question',
    id: 'q2c',
    text: 'Want to try something new or stick with familiar?',
    options: [
      { label: 'Surprise me', nextId: 'wine5' },
      { label: 'Keep it classic', nextId: 'wine1' }
    ]
  },
  {
    type: 'wine',
    id: 'wine1',
    name: 'Cloudy Bay Sauvignon Blanc',
    blurb: 'Crisp, refreshing, and effortlessly elegant. Perfect for unwinding after a long day.'
  },
  {
    type: 'wine',
    id: 'wine2',
    name: 'Penfolds Shiraz',
    blurb: 'Rich and full-bodied with a bold personality. This one makes a statement.'
  },
  {
    type: 'wine',
    id: 'wine3',
    name: 'Veuve Clicquot',
    blurb: 'The ultimate celebration wine. Sophisticated bubbles for special moments.'
  },
  {
    type: 'wine',
    id: 'wine4',
    name: 'Whispering Angel Rosé',
    blurb: 'Light, fun, and endlessly sippable. The life of any party.'
  },
  {
    type: 'wine',
    id: 'wine5',
    name: 'Ornellaia Bolgheri',
    blurb: 'An Italian masterpiece. Complex, surprising, and absolutely memorable.'
  }
];

export const FlowWidget = () => {
  // Demo state management
  // FOR CODEX: Replace with flowEngine.getCurrentNode(), flowEngine.goToNext(), etc.
  const [currentNodeId, setCurrentNodeId] = useState<string>('welcome');
  const [history, setHistory] = useState<string[]>([]);

  const currentNode = DEMO_FLOW.find(node => node.id === currentNodeId);
  const totalSteps = DEMO_FLOW.filter(n => n.type === 'question').length;
  const currentStep = history.filter(id => DEMO_FLOW.find(n => n.id === id)?.type === 'question').length + 
                     (currentNode?.type === 'question' ? 1 : 0);

  if (!currentNode) {
    return <div>Error: Node not found</div>;
  }

  const handleNext = (nextId: string) => {
    setHistory([...history, currentNodeId]);
    setCurrentNodeId(nextId);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousId = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentNodeId(previousId);
    }
  };

  const handleRestart = () => {
    setCurrentNodeId('welcome');
    setHistory([]);
  };

  const canGoBack = history.length > 0;
  const showProgress = currentNode.type === 'question';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-[480px]">
        {/* Main card */}
        <div className="bg-card rounded-[18px] shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Go with the flow
            </h1>
            <p className="text-base text-muted-foreground">
              Answer a few questions and Helena will point you at your next bottle
            </p>
          </div>

          {/* Progress bar */}
          {showProgress && <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />}

          {/* Back button */}
          {canGoBack && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground 
                       hover:text-foreground transition-colors mb-6 focus:outline-none 
                       focus:ring-2 focus:ring-primary focus:ring-offset-2 
                       focus:ring-offset-background rounded-full px-3 py-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}

          {/* Dynamic content based on node type */}
          <div className="min-h-[300px]">
            {currentNode.type === 'question' && (
              <QuestionView
                question={currentNode.text}
                options={currentNode.options.map(opt => ({
                  label: opt.label,
                  onClick: () => handleNext(opt.nextId)
                }))}
              />
            )}

            {currentNode.type === 'message' && (
              <MessageView
                message={currentNode.text}
                onNext={() => handleNext(currentNode.nextId)}
              />
            )}

            {currentNode.type === 'wine' && (
              <ResultView
                wineName={currentNode.name}
                blurb={currentNode.blurb}
                onRestart={handleRestart}
              />
            )}
          </div>
        </div>

        {/* Footer hint */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Powered by HelenaSips
        </p>
      </div>
    </div>
  );
};
