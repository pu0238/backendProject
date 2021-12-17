import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankSchema } from './rank.schema';
import { RankService } from './rank.service';

@Module({
  imports: [TypeOrmModule.forFeature([RankSchema])],
  providers: [RankService],
  exports: [RankService, TypeOrmModule],
})
export class RankModule {}
