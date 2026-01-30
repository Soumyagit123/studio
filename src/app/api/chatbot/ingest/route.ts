import { NextResponse } from 'next/server';
import { getAllDocuments, initializeVectorStore } from '@/ai/chatbot';

export async function POST() {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const documents = await getAllDocuments();
    await initializeVectorStore(documents);

    return NextResponse.json({
      success: true,
      documentCount: documents.length,
      message: 'Vector store initialized successfully',
    });
  } catch (error) {
    console.error('Ingestion error:', error);
    return NextResponse.json(
      {
        error: 'Failed to initialize vector store',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to trigger document ingestion',
  });
}
