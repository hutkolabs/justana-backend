import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async check() {
    return 'OK';
  }

  @Post('advise')
  async getHello(
    @Body() body: { balances: Array<{ asset: string; balance: string }> },
  ) {
    const balances = body?.balances ?? [
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
