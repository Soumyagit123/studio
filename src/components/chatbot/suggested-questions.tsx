'use client';

import { Button } from '@/components/ui/button';
import { useChat } from './chat-provider';

const SUGGESTED_QUESTIONS = [
  "What are Soumyaranjan's main skills?",
  'Tell me about his GenAI experience',
  'What projects has he worked on?',
  'What is his educational background?',
  'How can I contact him?',
];

export function SuggestedQuestions() {
  const { sendMessage, isLoading } = useChat();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {SUGGESTED_QUESTIONS.map((question) => (
        <Button
          key={question}
          variant="outline"
          size="sm"
          onClick={() => sendMessage(question)}
          disabled={isLoading}
          className="text-xs h-auto py-2 px-3 whitespace-normal text-left"
        >
          {question}
        </Button>
      ))}
    </div>
  );
}
