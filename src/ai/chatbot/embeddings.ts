import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';

let embeddingsInstance: HuggingFaceInferenceEmbeddings | null = null;

export function getEmbeddings(): HuggingFaceInferenceEmbeddings {
  if (!embeddingsInstance) {
    // Using free HuggingFace Inference API - no API key required for public models
    // sentence-transformers/all-MiniLM-L6-v2 is a free, fast, and good quality model
    embeddingsInstance = new HuggingFaceInferenceEmbeddings({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      apiKey: process.env.HUGGINGFACE_API_KEY || '', // Optional - works without key but with rate limits
    });
  }
  return embeddingsInstance;
}
