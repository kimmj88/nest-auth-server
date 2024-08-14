import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import { LoginGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post('/login')
  async login(@Request() req, @Response() res) {
    const userInfo = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );

    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httponly: false,
        maxAge: 100 * 60 * 60 * 24 * 7,
      });
    } else {
      return res.send({ message: 'login failed' });
    }

    return res.send({ message: 'login success' });
  }

  @UseGuards(LoginGuard)
  @Post('/login2')
  async login2(@Request() req, @Response() res) {
    if (!req.cookies['login'] && req.user) {
      res.cookie('login', JSON.stringify(req.user), {
        httpOnly: true,
        maxAge: 1000 * 10,
      });
    }
    return res.send({ message: 'login2 sucess' });
  }

  @UseGuards(LoginGuard)
  @Get('test-guard')
  testGuard() {
    return 'skip api test';
  }
}
