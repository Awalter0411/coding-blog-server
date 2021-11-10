import { ApiProperty } from "@nestjs/swagger";

export class ArticleListDto {
  @ApiProperty({
    description:'分页',
    type:Number
  })
  readonly page?: number;

  @ApiProperty({
    description:'单页数量',
    type:Number
  })
  readonly pageSize?: number;
}
