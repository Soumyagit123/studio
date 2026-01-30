'use client';

import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Bot, Send, User, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { chatWithPortfolioBot } from '@/ai/flows/portfolio-chatbot';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Initial greeting from the bot
  useEffect(() => {
    async function getInitialGreeting() {
      setIsLoading(true);
      try {
        const response = await chatWithPortfolioBot({ history: [{ role: 'user', content: 'Hello, introduce yourself.' }] });
        setMessages([{ id: uuidv4(), role: 'model', content: response }]);
      } catch (error) {
        console.error('Error getting initial greeting:', error);
        setMessages([{ id: uuidv4(), role: 'model', content: "Hello! I'm DashBot. I seem to be having some trouble connecting. Please try sending a message in a moment." }]);
      }
      setIsLoading(false);
    }
    getInitialGreeting();
  }, []);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: uuidv4(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const chatHistoryForFlow: { role: 'user' | 'model'; content: string }[] = [...messages, userMessage].map(m => ({ role: m.role, content: m.content }));

    try {
      const response = await chatWithPortfolioBot({ history: chatHistoryForFlow });
      setMessages((prev) => [...prev, { id: uuidv4(), role: 'model', content: response }]);
    } catch (error) {
      console.error('Error with chatbot:', error);
      setMessages((prev) => [...prev, { id: uuidv4(), role: 'model', content: "I'm sorry, I encountered an error. Please try again." }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-h-[500px] bg-card border rounded-lg shadow-lg">
      <ScrollArea className="flex-grow p-4" viewportRef={viewportRef}>
        <div className="space-y-4 pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}
            >
              {message.role === 'model' && (
                <Avatar className="h-8 w-8 border-2 border-primary">
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[80%] rounded-lg px-4 py-2 text-sm',
                  message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                )}
              >
                {message.content}
              </div>
              {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <Avatar className="h-8 w-8 border-2 border-primary">
                <AvatarFallback><Bot /></AvatarFallback>
              </Avatar>
              <div className="bg-secondary rounded-lg px-4 py-2">
                  <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me about my projects..."
            disabled={isLoading}
            className="flex-grow"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
