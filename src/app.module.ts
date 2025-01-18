/* ----------------------- THIS IS THE MAIN MODULE FROM THE ENTIRE PROJECT ---------------------- */

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}






/* ---------------------------------------- INFORMATIONS ---------------------------------------- */
/*
The basic structure of a model in NestJs is this:

  import { Module } from "@nestjs/common";
import { TestModule } from './test/test.module';

  @Module({})
  export class AppModule{}


To generate a model automaticly you can use this comand in the terminal:
  nest g module nameofthemodule




*/