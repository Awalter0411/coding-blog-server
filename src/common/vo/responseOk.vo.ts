import { ApiProperty } from "@nestjs/swagger";

export class ResponseOkVo {
  
  @ApiProperty({ description: '状态码', example: 200 })
  statusCode: number;

  @ApiProperty({ description: '请求结果信息', example: '操作成功' })
  message: string;
}