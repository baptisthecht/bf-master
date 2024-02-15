import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createMatchDto: CreateMatchDto) {
    const { teamAScore, teamBScore } = createMatchDto;
    const teamWinning = teamAScore > teamBScore ? 'A' : 'B';
    const match = this.matchRepository.create({
      ...createMatchDto,
      date: new Date(),
      teamWinning,
    });
    return await this.matchRepository.insert(match);
  }

  async findAll() {
    return await this.matchRepository.find();
  }

  async findByUser(id: number) {
    const matches: Match[] = await this.matchRepository.find({
      where: [
        { teamAPlayer1Id: id },
        { teamAPlayer2Id: id },
        { teamBPlayer1Id: id },
        { teamBPlayer2Id: id },
      ],
    });
    let formattedMatches = [];
    for (const match of matches) {
      console.log(match);
      let formattedMatch: any = { ...match };
      const teamAPlayer1 = await this.userRepository.findOne({
        where: { id: match.teamAPlayer1Id },
        select: ['id', 'username', 'firstName', 'lastName'],
      });
      formattedMatch.teamAPlayer1 = teamAPlayer1;
      const teamBPlayer1 = await this.userRepository.findOne({
        where: { id: match.teamBPlayer1Id },
        select: ['id', 'username', 'firstName', 'lastName'],
      });
      formattedMatch.teamBPlayer1 = teamBPlayer1;
      if (match.teamAPlayer2Id) {
        const teamAPlayer2 = await this.userRepository.findOne({
          where: { id: match.teamAPlayer2Id },
          select: ['id', 'username', 'firstName', 'lastName'],
        });
        formattedMatch.teamAPlayer2 = teamAPlayer2;
      }
      if (match.teamBPlayer2Id) {
        const teamBPlayer2 = await this.userRepository.findOne({
          where: { id: match.teamBPlayer2Id },
          select: ['id', 'username', 'firstName', 'lastName'],
        });
        formattedMatch.teamBPlayer2 = teamBPlayer2;
      }
      formattedMatches.push(formattedMatch);
    }
    return formattedMatches;
  }
}
