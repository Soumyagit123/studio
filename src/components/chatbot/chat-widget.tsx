'use client';

import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChat } from './chat-provider';
import { ChatSheet } from './chat-sheet';
import { cn } from '@/lib/utils';

export function ChatWidget() {
  const { isOpen, toggleChat, messages } = useChat();

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={toggleChat}
        size="lg"
        className={cn(
          'fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg',
          'bg-primary hover:bg-primary/90 text-primary-foreground',
          'transition-all duration-200 hover:scale-110',
          isOpen && 'rotate-90'
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            {messages.length === 0 && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive animate-pulse" />
            )}
          </>
        )}
      </Button>

      {/* Chat Sheet */}
      <ChatSheet />
    </>
  );
}
