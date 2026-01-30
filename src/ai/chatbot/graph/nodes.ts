import { AIMessage } from '@langchain/core/messages';
import { ChatStateType } from './state';
import { similaritySearch } from '../vector-store';
import { getLLM } from '../llm';
import { CHATBOT_CONFIG } from '../config';
import {
  SYSTEM_PROMPT,
  RETRIEVAL_PROMPT_TEMPLATE,
  isGreeting,
  isThanks,
  GREETING_RESPONSE,
  THANKS_RESPONSE,
} from '../prompts';

export async function classifyQuery(
  state: ChatStateType
): Promise<Partial<ChatStateType>> {
  const lastMessage = state.messages[state.messages.length - 1];
  const query =
    typeof lastMessage.content === 'string'
      ? lastMessage.content
      : String(lastMessage.content);

  // Check for greetings or thanks
  if (isGreeting(query) || isThanks(query)) {
    return {
      userQuery: query,
      shouldRetrieve: false,
    };
  }

  return {
    userQuery: query,
    shouldRetrieve: true,
  };
}

export async function retrieve(
  state: ChatStateType
): Promise<Partial<ChatStateType>> {
  const documents = await similaritySearch(
    state.userQuery,
    CHATBOT_CONFIG.TOP_K_DOCUMENTS
  );

  const context = documents.map((doc) => doc.pageContent).join('\n\n---\n\n');

  return {
    retrievedDocuments: documents,
    context,
  };
}

export async function generate(
  state: ChatStateType
): Promise<Partial<ChatStateType>> {
  const llm = getLLM();

  // Handle greetings and thanks without retrieval
  if (!state.shouldRetrieve) {
    const query = state.userQuery.toLowerCase().trim();
    if (isGreeting(query)) {
      return {
        messages: [new AIMessage(GREETING_RESPONSE)],
      };
    }
    if (isThanks(query)) {
      return {
        messages: [new AIMessage(THANKS_RESPONSE)],
      };
    }
  }

  // Build the prompt with context
  const prompt = RETRIEVAL_PROMPT_TEMPLATE.replace(
    '{context}',
    state.context || 'No specific context available.'
  ).replace('{question}', state.userQuery);

  const response = await llm.invoke([
    { role: 'system', content: SYSTEM_PROMPT },
    ...state.messages.slice(0, -1).map((msg) => ({
      role: msg._getType() === 'human' ? ('user' as const) : ('assistant' as const),
      content: typeof msg.content === 'string' ? msg.content : String(msg.content),
    })),
    { role: 'user', content: prompt },
  ]);

  return {
    messages: [new AIMessage(typeof response.content === 'string' ? response.content : String(response.content))],
  };
}
