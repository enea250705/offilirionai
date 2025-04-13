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

// Create custom language model matching the expected interface
class DeepSeekLanguageModel {
  readonly specificationVersion = 'v1';
  readonly provider = 'custom';
  readonly modelId = 'deepseek-chat'; 
  readonly defaultObjectGenerationMode = 'json';
  readonly streamable = false;

  async invoke(params: any) {
    try {
      const { messages, maxTokens } = params;
      const userMessage = messages[messages.length - 1].content;
      const isPro = maxTokens > 4000;
      
      const response = await generateChatCompletion(userMessage, isPro);
      
      return {
        content: response,
        usage: {
          prompt_tokens: messages.reduce((acc: number, msg: any) => acc + msg.content.length, 0) / 4,
          completion_tokens: response.length / 4,
          total_tokens: (messages.reduce((acc: number, msg: any) => acc + msg.content.length, 0) + response.length) / 4
        }
      };
    } catch (error) {
      console.error('Error generating text with DeepSeek:', error);
      return { content: 'An error occurred while generating a response.' };
    }
  }

  async doGenerate(params: any) {
    return this.invoke(params);
  }

  async *doStream(params: any) {
    const result = await this.invoke(params);
    yield result;
  }
}

// Create a simpler image generation model
class DeepSeekImageModel {
  readonly specificationVersion = 'v1';
  readonly provider = 'custom';
  readonly modelId = 'deepseek-image';

  async invoke(params: any) {
    try {
      const { prompt } = params;
      const imageUrl = await generateImage(prompt);
      
      return {
        images: [imageUrl]
      };
    } catch (error) {
      console.error('Error generating image with DeepSeek:', error);
      return { images: [] };
    }
  }

  async doGenerate(params: any) {
    return this.invoke(params);
  }

  async *doStream(params: any) {
    const result = await this.invoke(params);
    yield result;
  }
}

// Create instances of our custom models
const deepSeekLanguageModel = new DeepSeekLanguageModel();
const deepSeekImageModel = new DeepSeekImageModel();

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
        'chat-model': deepSeekLanguageModel,
        'chat-model-reasoning': wrapLanguageModel({
          model: deepSeekLanguageModel,
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': deepSeekLanguageModel,
        'artifact-model': deepSeekLanguageModel,
      },
      imageModels: {
        'small-model': deepSeekImageModel,
      },
    });
