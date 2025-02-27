/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditCourseDTO {
  @ApiProperty({
    description: 'Title of the course',
    example: 'English II',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Category of the course',
    example: 'Language',
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'Sub-category of the course',
    example: 'English II',
  })
  @IsString()
  @IsOptional()
  subCategory?: string;
  @ApiProperty({
    description: 'Video for',
    example: 'Name of the person',
  })
  @IsString()
  @IsOptional()
  modifiedBy: string;
  @ApiProperty({
    description: 'Video for',
    example: 'Name of the person',
  })
  @IsString()
  @IsOptional()
  VideoFor: string;
}
