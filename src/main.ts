/* eslint-disable prettier/prettier */
// configure dotenv before every thing, even imports
import * as dotenv from 'dotenv';
import * as path from 'path';
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, '../.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './response.interceptor';
import { CustomeExceptionsFilter } from './custome-exceptions.filter';
import { promisify } from 'util';
import { exec } from 'child_process';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new CustomeExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  //serve static file from directory
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "../..", "uploads"))
  );
  const port = process.env.APP_PORT;
  app.setGlobalPrefix('api/v1');
  await app.listen(port);
  Logger.log(`Server started on http://localhost:${port}`);
  try {
    const { stdout } = await exec('npx sequelize-cli db:seed:all');
    Logger.log('Initial seeding is done!');
    Logger.log('Use information below to login and start developing backend!');
    Logger.log('super-admin email: super@email.com');
    Logger.log('super-admin password: 123456');
  } catch (error) {
    Logger.log(error);
  }
}
bootstrap();
