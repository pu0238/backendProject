import { ConflictException, Injectable } from '@nestjs/common';
import { standardRes } from '../res/interface/standardRes.interface';
import { Post } from '../post/post.entity';
import { PostService } from '../post/post.service';
import { User } from '../user/user.entity';
import { AddBlogValidator } from './dto/blog.addBlog.dto';
import { EditBlogValidator } from './dto/blog.editBlog.dto';

@Injectable()
export class BlogService {
  constructor(private postService: PostService) {}

  async addBlog(body: AddBlogValidator, user: User): Promise<standardRes> {
    const post: Post = {
      title: body.title,
      author: user,
      contents: body.contents,
    };

    if (await this.postService.findOne({ title: body.title }))
      throw new ConflictException('There is already a blog with that title');

    await this.postService.insert(post);
    return { message: 'success', statusCode: 201 };
  }

  async editBlog(body: EditBlogValidator, user: User): Promise<standardRes> {
    const post: Post = {
      id: body.id,
      title: body.title,
      contents: body.contents,
    };
    const postFindedById = await this.postService.findOne(
      { id: body.id },
      { relations: ['author'] },
    );

    if (!postFindedById)
      throw new ConflictException('No blog with the given id was found');

    if (postFindedById.author.id != user.id)
      throw new ConflictException('You are not the author of this post');

    const postFindedByTitle = await this.postService.findOne({
      title: body.title,
    });

    if (postFindedByTitle && postFindedByTitle.id != post.id)
      throw new ConflictException('There is already a blog with that title');

    await this.postService.update({ id: body.id }, post);
    return { message: 'success', statusCode: 200 };
  }

  async deleteBlog(id: string, user: User): Promise<standardRes> {
    const commentFindedById = await this.postService.findOne(id, {
      relations: ['author'],
    });
    if (commentFindedById)
      throw new ConflictException('No comment with the given id was found');
    if (commentFindedById.author.id != user.id)
      throw new ConflictException('You are not the author of this comment');
    await this.postService.remove(id);
    return { message: 'success', statusCode: 200 };
  }

  async getBlog(id: string): Promise<Post> {
    return await this.postService.findOne({ id });
  }

  async getAllBlogs(): Promise<Post[]> {
    return await this.postService.findAll();
  }
}
