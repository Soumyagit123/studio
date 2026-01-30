'use client';

import { MessageCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChat } from './chat-provider';

export function ChatHeader() {
  const { messages, clearMessages } = useChat();

  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MessageCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">Portfolio Assistant</h3>
          <p className="text-xs text-muted-foreground">
            Ask me about Soumyaranjan
          </p>
        </div>
      </div>
      {messages.length > 0 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={clearMessages}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          title="Clear chat"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Clear chat</span>
        </Button>
      )}
    </div>
  );
}
