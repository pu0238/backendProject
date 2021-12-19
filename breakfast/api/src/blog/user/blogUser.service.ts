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

  async getAllUserBlogs(id: string): Promise<Post[]> {
    const user = await this.userService.findOne(id);
    if (!user) throw new ConflictException('User not found');
    return await this.postService.find({ user, relations: ['author'] });
  }

  async addUserData(
    data: UserAddDataValidator,
    user: User,
  ): Promise<standardRes> {
    const personalData: PersonalData = {
      ...data,
      birthDate: new Date(data.birthDate),
    };
    const findedUser = await this.userService.findOne({
      user,
      relations: ['personalData'],
    });
    if (!findedUser) throw new ConflictException('User not found');
    if (user.id != findedUser.id)
      throw new ConflictException('You can not add data for this user');
    console.log(findedUser);
    if (findedUser.personalData)
      return this.updateUserData(personalData, findedUser);
    else {
      await this.userService.save({ ...user, personalData });
      return { message: 'success', statusCode: 201 };
    }
  }

  async updateUserData(
    personalData: PersonalData,
    user: User,
  ): Promise<standardRes> {
    const updatedUser: User = {
      ...user,
      personalData: {
        ...user.personalData,
        ...personalData,
      },
    };
    await this.userService.save(updatedUser);
    return { message: 'success', statusCode: 200 };
  }

  async getUserData(id: string, user: User): Promise<User> {
    const findedUser = await this.userService.findOne({
      id,
      relations: ['personalData'],
    });
    if (!findedUser) throw new ConflictException('User not found');
    if (user.id != findedUser.id)
      throw new ConflictException('You cannot get this data');
    return findedUser;
  }

  async deleteUserData(id: string, user: User): Promise<standardRes> {
    if (user.id != id) throw new ConflictException('You cannot get this data');
    await this.personalService.remove(id);
    return { message: 'success', statusCode: 200 };
  }
}
