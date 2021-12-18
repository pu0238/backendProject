import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { PostService } from '../../post/post.service';
import { Post } from '../../post/post.entity';
import { standardRes } from '../../res/interface/standardRes.interface';
import { UserAddDataValidator } from '../../user/dto/user.addData.dto';
import { User } from '../../user/user.entity';
import { PersonalService } from '../../personal/personal.service';
import { PersonalData } from 'src/personal/personal.entity';

@Injectable()
export class BlogUserService {
  constructor(
    private postService: PostService,
    private userService: UserService,
    private personalService: PersonalService,
  ) {}

  async getAllUserBlogs(id: string): Promise<Post[]>{
    const user = await this.userService.findOne(id);
    if (!user) throw new ConflictException('User not found');
    return await this.postService.find({ user, relations: ['author'] });
  }

  async addUserData(data: UserAddDataValidator, user: User): Promise<standardRes>  {
      //const personal: PersonalData = data;
        console.log(await this.personalService.find({}))
        //await this.personalService.insert({data});
      return { message: 'success', statusCode: 201 };
  }
}
/*
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

*/
