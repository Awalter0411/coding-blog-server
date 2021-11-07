import { ApiProperty } from '@nestjs/swagger';
import { ResponseOkVo } from 'src/common/vo/responseOk.vo';
import { UserInfoVo } from './user-info.vo';

export class RegisterVo extends ResponseOkVo {
  @ApiProperty({
    description: '数据',
    type: UserInfoVo,
    example: UserInfoVo,
  })
  data: UserInfoVo;
}
