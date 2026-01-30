import { getVectorStore } from './vector-store';
import { CHATBOT_CONFIG } from './config';

export async function getRetriever() {
  const vectorStore = await getVectorStore();
  return vectorStore.asRetriever({
    k: CHATBOT_CONFIG.TOP_K_DOCUMENTS,
  });
}
