import { IsNotEmpty, IsString } from 'class-validator';

export class CourseDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  subCategory: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  modifiedBy: string;

  @IsString()
  @IsNotEmpty()
  videoFor: string;
}
