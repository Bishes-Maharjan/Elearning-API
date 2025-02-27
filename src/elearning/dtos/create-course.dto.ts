/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CourseDTO {
  @ApiProperty({
    description: 'Title of the course',
    example: 'English II',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Category of the course',
    example: 'Language',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Sub-category of the course',
    example: 'English II',
  })
  @IsString()
  @IsNotEmpty()
  subCategory: string;
  @ApiProperty({
    description: 'Video for',
    example: 'Name of the person',
  })
  @IsString()
  @IsNotEmpty()
  modifiedBy: string;
  @ApiProperty({
    description: 'Video for',
    example: 'Name of the person',
  })
  @IsString()
  @IsNotEmpty()
  VideoFor: string;
}
