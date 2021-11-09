import { ApiProperty } from '@nestjs/swagger';
import { CreateArticleDto } from './create-aritlce.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateArticleDto extends CreateArticleDto {
  @ApiProperty({
    description: '文章id',
    type: Number,
  })
  @IsNotEmpty({
    message: 'id不能为空',
  })
  id: number;
}
