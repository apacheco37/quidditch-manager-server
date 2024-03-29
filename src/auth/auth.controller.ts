import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUserInterface } from './interfaces/request-with-user.interface';
import { UserInterface } from './interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: RequestWithUserInterface): UserInterface {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(req.user);
    req.res.setHeader('Set-Cookie', accessTokenCookie);
    return req.user;
  }

  @Post('register')
  async register(@Body() registrationData: RegisterUserDto): Promise<UserInterface> {
    return this.authService.registerUser(registrationData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/verify')
  verifyToken(@Request() req: RequestWithUserInterface): UserInterface {
    return req.user;
  }
}
