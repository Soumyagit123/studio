import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';
import { getEmbeddings } from './embeddings';
import { getAllDocuments } from './document-loader';

let vectorStoreInstance: MemoryVectorStore | null = null;
let isInitialized = false;
let initializationPromise: Promise<MemoryVectorStore> | null = null;

export async function initializeVectorStore(
  documents?: Document[]
): Promise<MemoryVectorStore> {
  // If already initialized, return existing instance
  if (isInitialized && vectorStoreInstance) {
    return vectorStoreInstance;
  }

  // If initialization is in progress, wait for it
  if (initializationPromise) {
    return initializationPromise;
  }

  // Start initialization (only once)
  initializationPromise = (async () => {
    console.log('Initializing vector store (one-time)...');
    const docs = documents || (await getAllDocuments());
    const embeddings = getEmbeddings();

    vectorStoreInstance = await MemoryVectorStore.fromDocuments(docs, embeddings);
    isInitialized = true;

    console.log(`Vector store initialized with ${docs.length} documents (cached in memory)`);

    return vectorStoreInstance;
  })();

  return initializationPromise;
}

export async function getVectorStore(): Promise<MemoryVectorStore> {
  if (!vectorStoreInstance || !isInitialized) {
    return initializeVectorStore();
  }
  return vectorStoreInstance;
}

export function isVectorStoreReady(): boolean {
  return isInitialized && vectorStoreInstance !== null;
}

export async function similaritySearch(
  query: string,
  k: number = 4
): Promise<Document[]> {
  const store = await getVectorStore();
  return store.similaritySearch(query, k);
}
