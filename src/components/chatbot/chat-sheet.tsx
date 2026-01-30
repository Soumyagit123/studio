'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from './chat-provider';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';
import { ChatHeader } from './chat-header';
import { SuggestedQuestions } from './suggested-questions';

export function ChatSheet() {
  const { isOpen, setIsOpen, messages } = useChat();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Portfolio Assistant</SheetTitle>
          <SheetDescription>
            Ask questions about Soumyaranjan&apos;s experience and skills
          </SheetDescription>
        </SheetHeader>

        <ChatHeader />

        <ScrollArea className="flex-1 px-4">
          {messages.length === 0 ? (
            <div className="py-8 space-y-6">
              <p className="text-center text-muted-foreground text-sm">
                Hi! I&apos;m Soumyaranjan&apos;s portfolio assistant. Ask me
                anything about his skills, experience, or projects.
              </p>
              <SuggestedQuestions />
            </div>
          ) : (
            <ChatMessages />
          )}
        </ScrollArea>

        <ChatInput />
      </SheetContent>
    </Sheet>
  );
}
