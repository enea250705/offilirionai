<a href="https://ilirion-ai.vercel.app/">
  <img alt="Ilirion AI - A powerful AI chatbot powered by DeepSeek." src="app/(chat)/opengraph-image.png">
  <h1 align="center">Ilirion AI</h1>
</a>

<p align="center">
    Ilirion AI is a powerful chatbot built with Next.js and the AI SDK, using DeepSeek's advanced LLMs for intelligent, context-aware responses.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [AI SDK](https://sdk.vercel.ai/docs)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Integration with DeepSeek AI models
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
  - [Neon Serverless Postgres](https://vercel.com/marketplace/neon) for saving chat history and user data
  - [Vercel Blob](https://vercel.com/storage/blob) for efficient file storage
- [Auth.js](https://authjs.dev)
  - Simple and secure authentication

## Model Providers

This application uses [DeepSeek](https://deepseek.com) AI models:
- DeepSeek Coder for coding tasks and development assistance
- DeepSeek LLM 67B for advanced reasoning and conversation

## Deploy Your Own

You can deploy your own version of Ilirion AI to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Filirion-ai-chatbot&env=AUTH_SECRET,DEEPSEEK_API_KEY&envDescription=Generate%20a%20random%20secret%20for%20authentication%20and%20add%20your%20DeepSeek%20API%20key&envLink=https%3A%2F%2Fgenerate-secret.vercel.app%2F32&project-name=ilirion-ai-chatbot&repository-name=ilirion-ai-chatbot&demo-title=Ilirion%20AI&demo-description=An%20Advanced%20AI%20Chatbot%20Powered%20by%20DeepSeek%20LLMs&demo-url=https%3A%2F%2Filirion-ai.vercel.app)

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Ilirion AI. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various AI and authentication provider accounts.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your Ilirion AI app should now be running on [localhost:3000](http://localhost:3000).
