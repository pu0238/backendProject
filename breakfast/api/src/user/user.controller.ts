import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Put,
  Delete,
} from '@nestjs/common';
import { CommentValidator } from '../blog/dto/blog.comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UUID } from '../blog/dto/blog.uuid.dto';
import { BlogUserService } from '../blog/user/blogUser.service';
import { Post as PostEntity } from '../post/post.entity';
import { UserAddDataValidator } from './dto/user.addData.dto';
import { standardRes } from '../res/interface/standardRes.interface';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly blogUserService: BlogUserService) {}

  @Get('blogs/:id')
  getAllUserBlogs(@Param() param: UUID): Promise<PostEntity[]> {
    return this.blogUserService.getAllUserBlogs(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('data')
  addUserData(@Body() body: UserAddDataValidator, @Request() req: any): Promise<standardRes> {
    return this.blogUserService.addUserData(body, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('data/:id')
  getUserData(@Param() param: UUID, @Request() req: any): Promise<User> {
    return this.blogUserService.getUserData(param.id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('data/:id')
  deleteUserData(@Param() param: UUID, @Request() req: any): Promise<standardRes> {
    return this.blogUserService.deleteUserData(param.id, req.user);
  }
}
