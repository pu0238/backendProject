import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { Post as PostEntity } from '../post/post.entity';
import { standardRes } from '../res/interface/standardRes.interface';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { BlogService } from './blog.service';
import { AddBlogValidator } from './dto/blog.addBlog.dto';
import { EditBlogValidator } from './dto/blog.editBlog.dto copy';
import { UUID } from './dto/blog.uuid.dto';
import { CommentValidator } from './dto/blog.comment.dto';
import { BlogUserService } from './user/blogUser.service';
import { BlogCommentService } from './comment/blogComment.service';
import { Comment } from '../comment/comment.entity';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly blogUserService: BlogUserService,
    private readonly blogCommentService: BlogCommentService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addBlog(
    @Body() body: AddBlogValidator,
    @Request() req,
  ): Promise<standardRes> {
    return this.blogService.addBlog(body, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  editBlog(
    @Body() body: EditBlogValidator,
    @Request() req,
  ): Promise<standardRes> {
    return this.blogService.editBlog(body, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteBlog(@Param() param: UUID, @Request() req): Promise<standardRes> {
    return this.blogService.deleteBlog(param.id, req.user);
  }

  @Get(':id')
  getBlog(@Param() param: UUID): Promise<PostEntity> {
    return this.blogService.getBlog(param.id);
  }

  @Get()
  getAllBlogs(): Promise<PostEntity[]> {
    return this.blogService.getAllBlogs();
  }

  @Get('user/:id')
  getAllUserBlogs(@Param() param: UUID): Promise<PostEntity[]> {
    return this.blogUserService.getAllUserBlogs(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('comment')
  addComment(
    @Body() body: CommentValidator,
    @Request() req,
  ): Promise<standardRes> {
    return this.blogCommentService.addComment(body, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('comment')
  editComment(
    @Body() body: CommentValidator,
    @Request() req,
  ): Promise<standardRes> {
    return this.blogCommentService.editComment(body, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('comment/:id')
  deleteComment(@Param() param: UUID, @Request() req): Promise<standardRes> {
    return this.blogCommentService.deleteComment(param.id, req.user);
  }

  @Get('comment')
  getAllComments(): Promise<Comment[]> {
    return this.blogCommentService.getAllComments();
  }

  @Get('comment/:id')
  getComment(@Param() param: UUID): Promise<Comment> {
    return this.blogCommentService.getComment(param.id);
  }
}
