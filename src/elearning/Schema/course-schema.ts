import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;
@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  order: number;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  videoFor: string;
  @Prop({ required: true })
  department: string;
  @Prop({ required: true })
  category: string;
  @Prop({ required: true })
  subCategory: string;
  @Prop({ required: true })
  modifiedBy: string;
  @Prop({ default: false })
  status: boolean;
  @Prop({})
  imageUrl?: string;
  @Prop({ enum: ['AideAscent', 'SEO'], required: false })
  keywords: string;
  @Prop({ default: false })
  isDeleted: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
