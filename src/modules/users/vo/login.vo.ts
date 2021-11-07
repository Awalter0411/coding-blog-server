import { ApiProperty } from "@nestjs/swagger";
import { ResponseOkVo } from "src/common/vo/responseOk.vo";
import { TokenVo } from "./token.vo";

export class LoginVo extends ResponseOkVo{
  @ApiProperty({
    description: '数据',
    type: TokenVo,
    example: TokenVo
  })
  data: TokenVo
}