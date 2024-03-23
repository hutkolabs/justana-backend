import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIService } from './open-ai.service';
import { ConfigModule } from '@nestjs/config';
import { CoinMarketCapService } from './coinmarketcap.service';
import { DafillamaService } from './dafillama.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    OpenAIService,
    CoinMarketCapService,
    DafillamaService,
  ],
})
export class AppModule {}
