import { Document } from '@langchain/core/documents';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { CHATBOT_CONFIG } from './config';
import path from 'path';

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: CHATBOT_CONFIG.CHUNK_SIZE,
  chunkOverlap: CHATBOT_CONFIG.CHUNK_OVERLAP,
  separators: ['\n\n', '\n', '. ', ' ', ''],
});

export async function loadResumeDocuments(): Promise<Document[]> {
  try {
    const resumePath = path.join(process.cwd(), 'public', 'resume.pdf');
    console.log(`Loading resume from: ${resumePath}`);

    // Use LangChain PDFLoader as per official docs
    const loader = new PDFLoader(resumePath, {
      splitPages: false, // Load entire PDF as single document
      parsedItemSeparator: ' ', // Handle spacing properly
    });

    const docs = await loader.load();
    console.log(`PDF loaded: ${docs.length} document(s), ${docs[0]?.pageContent?.length || 0} chars`);

    if (!docs.length || !docs[0]?.pageContent) {
      throw new Error('PDF loading failed or PDF is empty');
    }

    // Split into smaller chunks for better retrieval
    const splitDocs = await textSplitter.splitDocuments(docs);
    console.log(`Split into ${splitDocs.length} chunks for retrieval`);

    return splitDocs.map((doc, index) => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        source: 'resume',
        chunkIndex: index,
        totalChunks: splitDocs.length,
      },
    }));
  } catch (error) {
    console.error('Error loading resume PDF:', error);
    throw error;
  }
}

// Main function - ONLY loads from resume PDF
export async function getAllDocuments(): Promise<Document[]> {
  const resumeDocs = await loadResumeDocuments();

  console.log(`Loaded ${resumeDocs.length} chunks from resume PDF`);

  if (resumeDocs.length === 0) {
    throw new Error('No documents loaded from resume PDF.');
  }

  return resumeDocs;
}
