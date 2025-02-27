import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/elearning/Schema/course-schema';
import { ElearningController } from './elearning.controller';
import { ElearningService } from './elearning.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  controllers: [ElearningController],
  providers: [ElearningService],
})
export class ElearningModule {}
