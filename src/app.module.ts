import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ElearningModule } from './elearning/elearning.module';

@Module({
  imports: [
    ElearningModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
