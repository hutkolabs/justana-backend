import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAIService {
  defaultSystemPrompt =
    "Generate investment hints based on user-provided assets and data retrieved from CoinMarketCap and Delailama. Consider factors such as historical performance, market trends, volatility, and potential future developments. Provide insightful analysis and recommendations tailored to the user's specified assets, aiming to optimize investment decisions and maximize returns.";
  secondDefaultSystemPrompt = `I need short smart answer, not more 50 words. It must include direct advise for user.(e.g. Given Ethereum's Dencun update and the price's recession in the last few days, you might want to consider allocating 10% of your investment portfolio to ETH. -> buy ETH for 10 USDC)`;

  thirdDefaultSystemPrompt = `Use absolute numbers and currency symbols. (e.g. buy ETH for 10 USDC), do not use percentages. (e.g. buy BTC for 5 USDC)`;

  openAI: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');

    this.openAI = new OpenAI({
      apiKey,
    });
  }

  async createCompletion(prompt: string): Promise<string> {
    const response = await this.openAI.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: this.defaultSystemPrompt,
        },
        {
          role: 'system',
          content: this.secondDefaultSystemPrompt,
        },
        {
          role: 'system',
          content: this.thirdDefaultSystemPrompt,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    console.log(response);

    return response.choices[0].message.content;
  }

  async adviceToTip(prompt: string): Promise<string> {
    const response = await this.openAI.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You should transform next advice to tip. It must be short and clear. Minimal amount of words. (e.g. Given Ethereum's Dencun update and the price's recession in the last few days, you might want to consider allocating 10% of your investment portfolio to ETH. -> buy ETH for 10 USDC)`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    console.log(response);

    return response.choices[0].message.content;
  }

  async tipToJson(prompt: string): Promise<string> {
    const response = await this.openAI.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `
          You should transform next tip to json. (e.g. buy ETH for 10 USDC -> {actions: [{"action": "buy", "amount": 10, "currency": "USDC", "target": "ETH" }])
          Schema: {actions: Array<{"action": "buy"|"sell", "amount": number, "currency": string, "target": string }>}
          Use only this schema. No additional fields. Every field is required.
          `,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: {
        type: 'json_object',
      },
    });

    console.log(response);

    return JSON.parse(response.choices[0].message.content);
  }
}
