import { ApiProperty } from '@nestjs/swagger';

export class UserInfoVo {
  @ApiProperty({
    description: '用户id',
    type: Number,
    example: 1
  })
  id: number;

  @ApiProperty({
    description: '用户名',
    type: String,
  })
  username: string;
}
