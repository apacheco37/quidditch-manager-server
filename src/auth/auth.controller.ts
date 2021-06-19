import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtResponseInterface } from './interfaces/jwt-response.interface';
import { RequestWithUserInterface } from './interfaces/request-with-user.interface';
import { UserResponseInterface } from './interfaces/user-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestWithUserInterface): Promise<JwtResponseInterface> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registrationData: RegisterUserDto): Promise<UserResponseInterface> {
    return this.authService.registerUser(registrationData);
  }
}
