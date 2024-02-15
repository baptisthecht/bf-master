import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { MatchModule } from './match/match.module';
import { Match } from './match/entities/match.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'bf-db',
      port: 5432,
      username: 'postgres',
      password: 'B4PT1ST',
      database: 'postgres',
      entities: [User, Match],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    MatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
