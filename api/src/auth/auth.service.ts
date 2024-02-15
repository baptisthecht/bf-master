import { Injectable } from '@nestjs/common';
import { loginDto } from './dtos/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly JwtService: JwtService,
  ) {}

  async login(dto: loginDto) {
    const { username, password } = dto;
    if (!username || !password) return 'Missing username or password';
    const user = await this.userRepository.findOne({
      where: { username, password },
    });
    if (!user) return 'Invalid username or password';
    const payload = {
      sub: user.id,
      username: user.username,
    };
    const token = this.JwtService.sign(payload, {
      expiresIn: '365d',
      secret: 'IANORD',
    });
    return {
      token,
      user,
      data: 'Logged in successfully',
      success: true,
    };
  }

  async getUserData(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async getUsers() {
    return await this.userRepository.find({
      select: ['id', 'username', 'firstName', 'lastName', 'losses', 'wins'],
    });
  }
}
