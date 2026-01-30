export const CHATBOT_CONFIG = {
  // Text Splitting
  CHUNK_SIZE: 500,
  CHUNK_OVERLAP: 100,

  // Retrieval
  TOP_K_DOCUMENTS: 4,

  // LLM (Anthropic Claude Haiku - fast, cheap, efficient)
  MODEL_NAME: 'claude-3-haiku-20240307',
  MAX_TOKENS: 1024,
  TEMPERATURE: 0.7,

  // Embeddings (HuggingFace free model - no API key required)
  EMBEDDING_MODEL: 'sentence-transformers/all-MiniLM-L6-v2',

  // Conversation
  MAX_HISTORY_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 2000,

  // UI
  SUGGESTED_QUESTIONS: [
    "What are Soumyaranjan's main skills?",
    'Tell me about his GenAI experience',
    'What projects has he worked on?',
    'What is his educational background?',
    'How can I contact him?',
  ],
} as const;
