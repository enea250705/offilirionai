import {
  CustomLanguageModel,
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

// Create a simpler custom language model using the SDK's helper class
class DeepSeekLanguageModel implements CustomLanguageModel {
  id = 'deepseek-chat';

  async generate(params: any) {
    try {
      const { messages, maxTokens } = params;
      const userMessage = messages[messages.length - 1].content;
      const isPro = maxTokens > 4000;
      
      const response = await generateChatCompletion(userMessage, isPro);
      
      return {
        text: response,
        usage: {
          promptTokens: messages.reduce((acc: number, msg: any) => acc + msg.content.length, 0) / 4,
          completionTokens: response.length / 4,
          totalTokens: (messages.reduce((acc: number, msg: any) => acc + msg.content.length, 0) + response.length) / 4
        }
      };
    } catch (error) {
      console.error('Error generating text with DeepSeek:', error);
      return { text: 'An error occurred while generating a response.' };
    }
  }
}

// Create a simpler image generation model
class DeepSeekImageModel implements CustomLanguageModel {
  id = 'deepseek-image';

  async generate(params: any) {
    try {
      const { prompt } = params;
      const imageUrl = await generateImage(prompt);
      
      return {
        text: '',
        images: [imageUrl]
      };
    } catch (error) {
      console.error('Error generating image with DeepSeek:', error);
      return { text: 'An error occurred while generating an image.' };
    }
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
