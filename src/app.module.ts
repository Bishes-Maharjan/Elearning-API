import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ElearningModule } from './elearning/elearning.module';

@Module({
  imports: [
    ElearningModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
