export const DEFAULT_CHAT_MODEL: string = 'chat-model';

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'DeepSeek Coder',
    description: 'Specialized for code generation and development tasks',
  },
  {
    id: 'chat-model-reasoning',
    name: 'DeepSeek LLM 67B',
    description: 'Advanced large language model with superior reasoning capabilities',
  },
];
