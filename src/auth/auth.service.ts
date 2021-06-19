import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { JwtResponseInterface } from './interfaces/jwt-response.interface';
import { UserResponseInterface } from './interfaces/user-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<UserResponseInterface> {
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

  async login(user: UserResponseInterface): Promise<JwtResponseInterface> {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async registerUser(registerUserDto: RegisterUserDto): Promise<UserResponseInterface> {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const createdUser = await this.usersService.createUser({
      ...registerUserDto,
      password: hashedPassword
    });
    delete createdUser.password;
    return createdUser;
  }
}
