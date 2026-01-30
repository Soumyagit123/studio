'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatedSection } from '@/components/animated-section';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';
import { SuggestedQuestions } from './suggested-questions';
import { useChat } from './chat-provider';
import { MessageCircle } from 'lucide-react';

export function ChatSection() {
  const { messages } = useChat();

  return (
    <AnimatedSection id="chat" className="bg-secondary">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl">
          Ask Me Anything
        </h2>
        <p className="mt-4 text-center text-muted-foreground md:text-xl/relaxed max-w-2xl mx-auto">
          Have questions about my skills or experience? Chat with my AI
          assistant powered by RAG and LangGraph.
        </p>

        <Card className="mt-12 max-w-2xl mx-auto overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-3 border-b bg-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Portfolio Assistant</CardTitle>
              <CardDescription>Powered by LangChain & Gemini</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] px-4">
              {messages.length === 0 ? (
                <div className="py-8 space-y-6">
                  <p className="text-center text-muted-foreground text-sm">
                    Hi! I can answer questions about Soumyaranjan&apos;s
                    professional background, skills, and projects.
                  </p>
                  <SuggestedQuestions />
                </div>
              ) : (
                <ChatMessages />
              )}
            </ScrollArea>
            <ChatInput />
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}
