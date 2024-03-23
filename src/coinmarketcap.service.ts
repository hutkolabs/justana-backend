import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CoinMarketCap from 'coinmarketcap-api';

@Injectable()
export class CoinMarketCapService {
  private client: CoinMarketCap;
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('COINMARKETCAP_API_KEY');
    this.client = new CoinMarketCap(apiKey, {
      version: 'v2',
    });
  }

  async getAssets(balances) {
    return this.client.getQuotes({
      symbol: balances.map((balance) => balance.asset),
      convert: 'USD',
    });
  }
}
