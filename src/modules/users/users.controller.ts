import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from './decorators/user.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { LoginVo } from './vo/login.vo';
import { RegisterVo } from './vo/register.vo';

@ApiTags('用户模块')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * 用户注册
   * @param registerDto 注册的用户
   * @returns 注册成功的用户
   */
  @ApiOperation({
    summary: '用户注册',
  })
  @ApiBody({
    type: RegisterDto,
  })
  @ApiOkResponse({
    description: '用户注册',
    type: RegisterVo,
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.usersService.register(registerDto);
  }

    /**
   * 用户登录
   * @param loginDto 登录的用户
   * @returns token
   */
     @ApiOperation({
      summary: '用户登录'
    })
    @ApiBody({
      type: LoginDto
    })
    @ApiOkResponse({
      type: LoginVo
    })
    @Post('login') 
    async login(@Body () loginDto: LoginDto) {
      return await this.usersService.login(loginDto);
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('userInfo')
    async getUserInfo(@AuthUser('id') userId) {
      return await this.usersService.getUserInfo(userId)
    }

    /**
     * 修改用户信息
     * @param updateUserDto 
     * @param userId 
     * @returns 
     */
    @ApiOperation({
      summary: '修改用户信息'
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('update')
    async updateUser(@Body() updateUserDto:UpdateUserDto,@AuthUser('id') userId:number) {
      return await this.usersService.updateUser(updateUserDto,userId)
    }

}
