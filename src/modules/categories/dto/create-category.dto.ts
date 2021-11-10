import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: '分类名称',
    type: String,
  })
  @IsNotEmpty({
    message: '分类名称不能为空',
  })
  name: string;
}
