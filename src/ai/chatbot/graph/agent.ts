import { StateGraph } from '@langchain/langgraph';
import { ChatState, ChatStateType } from './state';
import { classifyQuery, retrieve, generate } from './nodes';

function shouldRetrieve(state: ChatStateType): 'retrieve' | 'generate' {
  return state.shouldRetrieve ? 'retrieve' : 'generate';
}

export function createChatAgent() {
  const graph = new StateGraph(ChatState)
    .addNode('classify', classifyQuery)
    .addNode('retrieve', retrieve)
    .addNode('generate', generate)
    .addEdge('__start__', 'classify')
    .addConditionalEdges('classify', shouldRetrieve, {
      retrieve: 'retrieve',
      generate: 'generate',
    })
    .addEdge('retrieve', 'generate')
    .addEdge('generate', '__end__');

  return graph.compile();
}

let agentInstance: ReturnType<typeof createChatAgent> | null = null;

export function getChatAgent() {
  if (!agentInstance) {
    agentInstance = createChatAgent();
  }
  return agentInstance;
}
