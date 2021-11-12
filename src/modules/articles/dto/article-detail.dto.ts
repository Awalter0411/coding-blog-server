import { ApiOperation, ApiProperty } from '@nestjs/swagger';

export class ArticleDetailDto {
  @ApiProperty({
    description: '文章id',
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: '用户名',
    type: String,
  })
  username: string;
}
