// auth.controller.ts
import { Controller, Request, Get, Post, UseGuards, Body, HttpException, HttpStatus } from '@nestjs/common';
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
  async login(@Body() body: any) {
    try {
      const user = await this.authService.validateUser(body.username, body.password);
      if (!user) { 
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      return this.authService.login(user);
    } catch (error) {
      throw error;
    }
}

  @Post('refresh-token')
  async refreshToken(@Body() body) {
    const { refresh_token } = body;
    try {
      const payload = this.jwtService.verify(refresh_token, { secret: this.configService.get<string>('JWT_SECRET_KEY') })
      const new_access_token = this.jwtService.sign(
        { username: payload.username, sub: payload.sub, email: payload.email, createdAt: payload.createdAt, updatedAt: payload.updatedAt}, { expiresIn: '1h' });
      return { access_token: new_access_token };
    } catch (e) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: any) {
    return req.user;
  }
}