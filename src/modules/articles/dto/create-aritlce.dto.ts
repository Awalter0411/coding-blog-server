import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: '标题',
    type: String,
  })
  @IsNotEmpty({
    message: '标题不能为空',
  })
  title: string;

  @ApiProperty({
    description: '简介',
    type: String,
  })
  @IsNotEmpty({
    message: '简介不能为空',
  })
  description: string;

  @ApiProperty({
    description: '内容',
    type: String,
  })
  @IsNotEmpty({
    message: '内容不能为空',
  })
  content: string;

  @ApiProperty({
    description: '分类',
    type: Number,
  })
  @IsNotEmpty({
    message: '分类不能为空',
  })
  category:number
}
