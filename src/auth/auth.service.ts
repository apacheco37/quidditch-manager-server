import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<UserInterface> {
    const user = await this.usersService.findUser(username);
    if (user) {
      const passwordMatch = await bcrypt.compare(pass, user.password);
      if (passwordMatch) {
        delete user.password;
        return user;
      }
      return null;
    }
    return null;
  }

  getCookieWithJwtAccessToken(user: UserInterface): string {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload); 
    return `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${jwtConstants.expiresIn}`;
  }

  async registerUser(registerUserDto: RegisterUserDto): Promise<UserInterface> {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const createdUser = await this.usersService.createUser({
      ...registerUserDto,
      password: hashedPassword
    });
    delete createdUser.password;
    return createdUser;
  }
}
