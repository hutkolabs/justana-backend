import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async check() {
    return 'OK';
  }

  @Get('advise')
  async getHello() {
    const balances = [
      {
        asset: 'BTC',
        balance: '0.1',
      },
      {
        asset: 'ETH',
        balance: '1.5',
      },
      {
        asset: 'USDC',
        balance: '1000',
      },
    ];

    return this.appService.getAdvise({ balances });
  }
}
