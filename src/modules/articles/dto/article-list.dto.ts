import { ApiProperty } from '@nestjs/swagger';

export class ArticleListDto {
  @ApiProperty({
    description: '用户名',
    type: String,
  })
  readonly username: string;
}
