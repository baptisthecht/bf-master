import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: loginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getUserData')
  async getUserData(@Request() req: any) {
    return this.authService.getUserData(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getUsers')
  async getUsers() {
    return this.authService.getUsers();
  }
}
