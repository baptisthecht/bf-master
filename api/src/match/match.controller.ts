import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.create(createMatchDto);
  }

  @Get()
  findAll() {
    return this.matchService.findAll();
  }

  @Get('findByUser')
  findByUser(@Query() payload: { id: number }) {
    return this.matchService.findByUser(payload.id);
  }
}
