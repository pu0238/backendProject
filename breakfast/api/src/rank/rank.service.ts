import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Rank } from './rank.entity';

@Injectable()
export class RankService {
    constructor(
        @InjectRepository(Rank)
        private usersRepository: Repository<Rank>,
      ) {}
    
      findAll(): Promise<Rank[]> {
        return this.usersRepository.find();
      }
    
      findOne(arg: any): Promise<Rank> {
        return this.usersRepository.findOne(arg);
      }
    
      insert(user: Rank): Promise<InsertResult> {
        return this.usersRepository.insert(user);
      }
    
      async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
      }
}
