import { NextRequest, NextResponse } from 'next/server';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { getChatAgent, isVectorStoreReady, initializeVectorStore } from '@/ai/chatbot';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  message: string;
  conversationHistory?: ConversationMessage[];
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ChatRequest;
    const { message, conversationHistory = [] } = body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Message too long. Maximum 2000 characters.' },
        { status: 400 }
      );
    }

    // Initialize vector store if not ready (will use cached instance if already initialized)
    if (!isVectorStoreReady()) {
      await initializeVectorStore();
    }

    // Convert conversation history to LangChain messages
    const messages = conversationHistory.slice(-10).map((msg) =>
      msg.role === 'user'
        ? new HumanMessage(msg.content)
        : new AIMessage(msg.content)
    );
    messages.push(new HumanMessage(message));

    // Get the agent and invoke
    const agent = getChatAgent();

    // Create streaming response
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Run the agent and stream results
    (async () => {
      try {
        const eventStream = await agent.streamEvents(
          { messages, userQuery: message },
          { version: 'v2' }
        );

        for await (const event of eventStream) {
          if (
            event.event === 'on_chat_model_stream' &&
            event.data?.chunk?.content
          ) {
            const chunk = event.data.chunk.content;
            if (typeof chunk === 'string' && chunk) {
              await writer.write(
                encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`)
              );
            }
          }
        }

        await writer.write(encoder.encode('data: [DONE]\n\n'));
      } catch (error) {
        console.error('Streaming error:', error);
        await writer.write(
          encoder.encode(
            `data: ${JSON.stringify({ error: 'Failed to generate response' })}\n\n`
          )
        );
      } finally {
        await writer.close();
      }
    })();

    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process message',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Portfolio Chatbot API',
    usage: 'POST with { message: string, conversationHistory?: Array }',
  });
}
