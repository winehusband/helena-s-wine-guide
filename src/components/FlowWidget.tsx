/**
 * FlowWidget Component
 * Main container for the HelenaSips Wine Flow
 * Now powered by JSON-driven flow data and a small engine
 */

import { useMemo, useState } from 'react';
import { QuestionView } from './QuestionView';
import { MessageView } from './MessageView';
import { ResultView } from './ResultView';
import { ProgressBar } from './ProgressBar';
import { ArrowLeft } from 'lucide-react';
import { FlowNode } from '@/lib/flowTypes';
import { countQuestions, getNode, getStartId, isTerminal } from '@/lib/flowEngine';
import { flowGraph } from '@/lib/flowGraph';

export const FlowWidget = () => {
  const flow = flowGraph;

  const [currentNodeId, setCurrentNodeId] = useState<string>(getStartId(flow));
  const [history, setHistory] = useState<string[]>([]);

  const currentNode: FlowNode | undefined = getNode(flow, currentNodeId);
  const totalSteps = countQuestions(flow);
  const currentStep =
    history.filter((id) => getNode(flow, id)?.type === 'question').length +
    (currentNode?.type === 'question' ? 1 : 0);

  if (!currentNode) {
    return <div>Error: Node not found</div>;
  }

  const goTo = (nextId: string) => {
    if (isTerminal(nextId)) {
      handleRestart();
      return;
    }
    setHistory((prev) => [...prev, currentNodeId]);
    setCurrentNodeId(nextId);
  };

  const handleBack = () => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const previousId = prev[prev.length - 1];
      setCurrentNodeId(previousId);
      return prev.slice(0, -1);
    });
  };

  const handleRestart = () => {
    setCurrentNodeId(getStartId(flow));
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

          {/* Dynamic content based on node type */}
          <div className="min-h-[300px]">
            {currentNode.type === 'question' && (
              <QuestionView
                question={currentNode.text}
                options={currentNode.options.map((opt) => ({
                  label: opt.label,
                  onClick: () => goTo(opt.nextId),
                }))}
                onBack={canGoBack ? handleBack : undefined}
              />
            )}

            {currentNode.type === 'message' && (
              <MessageView
                message={currentNode.text}
                onNext={() => goTo(currentNode.nextId)}
                onBack={canGoBack ? handleBack : undefined}
              />
            )}

            {currentNode.type === 'wine' && (
              <ResultView
                wineName={currentNode.wine}
                wineKey={currentNode.wineKey}
                blurb={currentNode.blurb}
                onRestart={handleRestart}
                onBack={canGoBack ? handleBack : undefined}
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
