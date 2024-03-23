import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as util from 'node:util';
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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
