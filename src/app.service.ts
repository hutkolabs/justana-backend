import { Injectable } from '@nestjs/common';
import { OpenAIService } from './open-ai.service';
import { CoinMarketCapService } from './coinmarketcap.service';

type Balance = {
  asset: string;
  balance: string;
};

@Injectable()
export class AppService {
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly coinMarketCapService: CoinMarketCapService,
  ) {}

  async getAdvise({ balances }: { balances: Array<Balance> }) {
    const info = (await this.coinMarketCapService.getAssets(
      balances,
    )) as unknown as object;

    const infoWithBalances = {
      ...info,
      balances: `Available user balances: ${balances}`,
    };

    const advise = await this.openAIService.createCompletion(
      JSON.stringify(infoWithBalances),
    );

    const tip = await this.openAIService.adviceToTip(advise);

    const json = await this.openAIService.tipToJson(tip);

    return {
      advise,
      tip,
      json,
    };
  }
}
