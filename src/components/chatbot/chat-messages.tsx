'use client';

import { useEffect, useRef } from 'react';
import { useChat } from './chat-provider';
import { ChatMessageBubble } from './chat-message';
import { TypingIndicator } from './typing-indicator';

interface ChatMessagesProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export function ChatMessages({ scrollContainerRef }: ChatMessagesProps) {
  const { messages, isLoading } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll within the container instead of the whole page
    if (scrollContainerRef?.current && bottomRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading, scrollContainerRef]);

  return (
    <div className="flex flex-col gap-4 py-4">
      {messages.map((message) => (
        <ChatMessageBubble key={message.id} message={message} />
      ))}
      {isLoading && messages[messages.length - 1]?.role === 'user' && (
        <TypingIndicator />
      )}
      <div ref={bottomRef} />
    </div>
  );
}
