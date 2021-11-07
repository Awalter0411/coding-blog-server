import { ApiProperty } from "@nestjs/swagger";

export class TokenVo {
  @ApiProperty({
    description: 'token',
    example: 'eqweasda213123'
  })
  token: string
}