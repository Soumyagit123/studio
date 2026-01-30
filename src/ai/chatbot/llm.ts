import { ChatAnthropic } from '@langchain/anthropic';
import { CHATBOT_CONFIG } from './config';

let llmInstance: ChatAnthropic | null = null;

export function getLLM(): ChatAnthropic {
  if (!llmInstance) {
    llmInstance = new ChatAnthropic({
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
      model: CHATBOT_CONFIG.MODEL_NAME,
      maxTokens: CHATBOT_CONFIG.MAX_TOKENS,
      temperature: CHATBOT_CONFIG.TEMPERATURE,
    });
  }
  return llmInstance;
}

export function getStreamingLLM(): ChatAnthropic {
  return new ChatAnthropic({
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    model: CHATBOT_CONFIG.MODEL_NAME,
    maxTokens: CHATBOT_CONFIG.MAX_TOKENS,
    temperature: CHATBOT_CONFIG.TEMPERATURE,
    streaming: true,
  });
}
