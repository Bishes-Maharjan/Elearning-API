import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;
@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  category: string;
  @Prop({ required: true })
  subCategory: string;
  @Prop({ required: true })
  VideoFor: string;
  @Prop({ required: true })
  modifiedBy: string;

  @Prop({ default: false })
  status: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
