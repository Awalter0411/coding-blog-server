import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: '用户名',
    type: String,
  })
  @IsString({
    message: '用户名必须是字符串',
  })
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;

  @ApiProperty({
    description: '密码',
    type: String,
  })
  @IsString({
    message: '密码必须是字符串',
  })
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;

  @ApiProperty({
    description: '再次输入密码',
    type: String,
  })
  @IsString({
    message: '再次输入的密码必须是字符串',
  })
  @IsNotEmpty({
    message: '再次输入的密码不能为空',
  })
  passwordRepeat: string;
}
