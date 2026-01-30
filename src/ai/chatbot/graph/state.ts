import { Annotation, MessagesAnnotation } from '@langchain/langgraph';
import { Document } from '@langchain/core/documents';

export const ChatState = Annotation.Root({
  ...MessagesAnnotation.spec,

  userQuery: Annotation<string>({
    reducer: (_, next) => next,
    default: () => '',
  }),

  retrievedDocuments: Annotation<Document[]>({
    reducer: (_, next) => next,
    default: () => [],
  }),

  shouldRetrieve: Annotation<boolean>({
    reducer: (_, next) => next,
    default: () => true,
  }),

  context: Annotation<string>({
    reducer: (_, next) => next,
    default: () => '',
  }),
});

export type ChatStateType = typeof ChatState.State;
