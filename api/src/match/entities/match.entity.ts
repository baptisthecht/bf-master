import { Optional } from '@nestjs/common';
import { Column, Entity, IsNull, PrimaryGeneratedColumn } from 'typeorm';

@Entity('match')
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  teamAPlayer1Id: number;

  @Column({
    nullable: true,
  })
  teamAPlayer2Id: number;

  @Column()
  teamBPlayer1Id: number;

  @Column({
    nullable: true,
  })
  teamBPlayer2Id: number;

  @Column()
  teamAScore: number;

  @Column()
  teamBScore: number;

  @Column()
  teamWinning: 'A' | 'B';
}
