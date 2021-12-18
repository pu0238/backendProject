import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';
import { default as config } from '../ormconfig';
import { BlogModule } from './blog/blog.module';
import { CommentModule } from './comment/comment.module';
import { CommentService } from './comment/comment.service';
import { RankModule } from './rank/rank.module';
import { PersonalModule } from './personal/personal.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    TypeOrmModule.forRoot(config),
    BlogModule,
    RankModule,
    PersonalModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PostService, CommentService],
})
export class AppModule {}
