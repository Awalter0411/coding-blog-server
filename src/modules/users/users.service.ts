import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram.util';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 用户注册
  async register(registerDto: RegisterDto) {
    const { username, password, passwordRepeat } = registerDto;
    const user = await this.userRepository.findOne({
      where: {
        username: username,
        isDelete: false,
      },
    });
    if (user) {
      throw new NotFoundException('用户名已经存在');
    }

    if (password !== passwordRepeat) {
      throw new NotFoundException('两次密码输入不一致');
    }

    const salt = makeSalt();
    const hashPassword = encryptPassword(password, salt);

    const newUser = new User();
    for (let key in registerDto) {
      newUser[key] = registerDto[key];
    }
    newUser.password = hashPassword;
    newUser.salt = salt;
    const result = await this.userRepository.save(newUser);
    return {
      id: result.id,
      username: result.username,
    };
  }

  // 用户登录
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: {
        username: username,
        isDelete: false,
      },
    });
    if (!user) {
      throw new HttpException('用户名不存在', 404);
    }

    const hashPassword = encryptPassword(password, user.salt);
    if (hashPassword !== user.password) {
      throw new HttpException('用户名或密码不正确', 404);
    }
    // 生成token
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = this.jwtService.sign(payload);
    return {
      token,
    };
  }
}
