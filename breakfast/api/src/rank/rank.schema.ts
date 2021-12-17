import { EntitySchema } from 'typeorm';
import { Rank } from './rank.entity';

export const RankSchema = new EntitySchema<Rank>({
  name: 'Rank',
  target: Rank,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    rank: {
      type: String,
    },
    permissionsLvl: {
      type: Number,
    },
  },
});