import { Rank } from '../rank/rank.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PersonalData } from '../personal/personal.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @ManyToOne(() => Rank, (rank) => rank.id, { nullable: false })
  @JoinColumn()
  rank?: Rank;

  @ManyToOne(() => PersonalData, (personal) => personal.id)
  @JoinColumn()
  personalData?: PersonalData;

  @Column({ type: 'varchar', length: 64, nullable: false })
  password?: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  salt?: string;

  @CreateDateColumn()
  createdDate?: Date;

  @UpdateDateColumn()
  updatedDate?: Date;
}