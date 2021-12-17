import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Rank {
  @PrimaryGeneratedColumn('increment')
  id?: string;

  @Column({ type: 'varchar', nullable: false, length: 25 })
  rank: string;

  @Column({ type: 'int', nullable: false})
  permissionsLvl?: number;

  
  @CreateDateColumn()
  createdDate?: Date;

  @UpdateDateColumn()
  updatedDate?: Date;
}
