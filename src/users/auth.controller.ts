// auth.controller.ts
import { Controller, Request, Get, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body) {
    const { refresh_token } = body;
    try {
      const payload = this.jwtService.verify(refresh_token, { secret: this.configService.get<string>('JWT_SECRET_KEY') })
      const new_access_token = this.jwtService.sign({ username: payload.username, sub: payload.sub}, { expiresIn: '1h' });
      return { access_token: new_access_token };
    } catch (e) {
      return {message: 'Invalid refresh token'};
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}