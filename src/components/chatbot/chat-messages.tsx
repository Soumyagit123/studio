'use client';

import { useEffect, useRef } from 'react';
import { useChat } from './chat-provider';
import { ChatMessageBubble } from './chat-message';
import { TypingIndicator } from './typing-indicator';

export function ChatMessages() {
  const { messages, isLoading } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

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
