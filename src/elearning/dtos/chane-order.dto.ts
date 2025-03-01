import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ChangeOrder {
  @ApiProperty()
  @IsNumber({})
  @IsNotEmpty()
  order: number;
}
