import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: '密码',
    example: '123456',
    type: String,
  })
  // @IsNotEmpty({ message: '密码不能为空' })
  oldPassword?: string;

  @ApiProperty({
    description: '新密码',
    example: '123456',
    type: String,
  })
  newPassword?: string;

  @ApiProperty({
    description: '个人介绍',
    example: 'Hello World',
    type: String,
  })
  @IsNotEmpty({ message: '个人介绍不能为空' })
  desc: string;
}
