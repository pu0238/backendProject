import { getEnv } from './src/middleware/getEnv';
import { Post } from './src/post/post.entity';
import { User } from './src/user/user.entity';
import { Comment } from './src/comment/comment.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Rank } from './src/rank/rank.entity';
import { PersonalData } from './src/personal/personal.entity';

const nodeEnvironment = getEnv('NODE_ENV').toUpperCase();
const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: getEnv(`${nodeEnvironment}_DATABASE_HOST`),
  port: parseInt(getEnv(`${nodeEnvironment}_DATABASE_PORT`)) ?? 3306,
  username: getEnv(`${nodeEnvironment}_DATABASE_USER`),
  password: getEnv(`${nodeEnvironment}_DATABASE_PASSWORD`),
  database: getEnv(`${nodeEnvironment}_DATABASE_NAME`),
  entities: [User, Post, Comment, Rank, PersonalData],
  migrationsTableName: 'custom_migration_table',
  migrations: ['dist/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migration',
  },
  //synchronize: nodeEnvironment === "DEVELOPMENT" ? true : false,
  //autoLoadEntities: true,
};
export = config;
