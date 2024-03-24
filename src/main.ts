import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as util from 'node:util';
import { Logger } from '@nestjs/common';
const log = console.log;

console.log = (...args) => {
  const inspectedArgs = args.map((arg) => {
    if (typeof arg === 'object' && arg !== null) {
      return util.inspect(arg, {
        showHidden: false,
        depth: 5,
        colors: true,
      });
    }

    return arg;
  });

  log(...inspectedArgs);
};

const PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    Logger.log(`Server running on ${PORT} port`);
  });
}
bootstrap();
