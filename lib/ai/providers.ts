import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { generateChatCompletion, generateImage } from './deepseek';

// Create a wrapper for our custom DeepSeek implementation
const customDeepSeek = {
  async invoke(params: any) {
    const { messages, maxTokens } = params;
    const userMessage = messages[messages.length - 1].content;
    const isPro = maxTokens > 4000; // Determine if this is a Pro user based on token allocation
    
    // Call our custom implementation
    const response = await generateChatCompletion(userMessage, isPro);
    
    // Return in the format expected by the AI SDK
    return {
      content: response,
      usage: {
        prompt_tokens: messages.reduce((acc: number, msg: any) => acc + msg.content.length, 0) / 4,
        completion_tokens: response.length / 4,
        total_tokens: (messages.reduce((acc: number, msg: any) => acc + msg.content.length, 0) + response.length) / 4
      }
    };
  }
};

// Create a wrapper for image generation
const customDeepSeekImage = {
  async invoke(params: any) {
    const { prompt } = params;
    const imageUrl = await generateImage(prompt);
    
    return {
      images: [imageUrl]
    };
  }
};

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': customDeepSeek,
        'chat-model-reasoning': wrapLanguageModel({
          model: customDeepSeek,
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': customDeepSeek,
        'artifact-model': customDeepSeek,
      },
      imageModels: {
        'small-model': customDeepSeekImage,
      },
    });
