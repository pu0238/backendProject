import { Injectable } from "@nestjs/common";
import { Post } from "../../post/post.entity";
import { PostService } from "../../post/post.service";

@Injectable()
export class BlogUserService {
  constructor(private postService: PostService) {}

  async getAllUserBlogs(id: string): Promise<Post[]> {
    return await this.postService.find({ author: id });
  }
}
