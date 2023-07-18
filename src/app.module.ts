import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from "joi";

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    validationSchema: Joi.object({
      PORT: Joi.number().required()
    })
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
