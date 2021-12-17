import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { SingInValidator } from './dto';
import { accessToken } from './interfaces/auth.accessToken';
import { randomBytes, createHash } from 'crypto';
import { Rank } from '../rank/rank.entity';
import { RankService } from '../rank/rank.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private rankService: RankService,
  ) {}

  validateEmail(email: string): boolean {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
  validatePassword(password: string): boolean {
    const re =
      /^(?=.*[0-9])(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[a-zA-Z0-9 `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{6,32}$/;
    return re.test(password);
  }
  saltPassword(password: string, salt: string): string {
    let passwordToAsci = 0;
    const passwordWithSalt = password.split('');
    passwordWithSalt.map((letter) => (passwordToAsci += letter.charCodeAt(0)));
    passwordWithSalt.splice(passwordToAsci % (password.length + 1), 0, salt);

    return passwordWithSalt.join('');
  }
  saltAndHash(password: string, salt: string): string {
    const saltedPassword = this.saltPassword(password, salt);
    return createHash('sha256').update(saltedPassword).digest('hex');
  }
  async getUserByEmailOrUsername(
    usernameOrEmail: string,
  ): Promise<User | undefined> {
    if (this.validateEmail(usernameOrEmail)) {
      return await this.userService.findOne({ email: usernameOrEmail }, {
        relations: ['rank'],
      });
    }
    return await this.userService.findOne({ username: usernameOrEmail }, {
      relations: ['rank'],
    });
  }

  async validateUser(
    usernameOrEmail: string,
    passwd: string,
  ): Promise<User | null> {
    const user = await this.getUserByEmailOrUsername(usernameOrEmail);
    if (!user) return null;
    if (user.password === this.saltAndHash(passwd, user.salt)) {
      const { password, salt, ...result } = user;
      return result;
    }
    return null;
  }

  async singIn(body: SingInValidator, rank?: Rank): Promise<accessToken> {
    const user: User = {
      username: body.username,
      email: body.email,
      password: body.password,
      salt: null,
    };
    if (!rank) rank = { rank: 'user' };
    if (!this.validatePassword(user.password))
      throw new ConflictException(
        'Password does not contain a number or a special character',
      );
    if (
      (await this.getUserByEmailOrUsername(user.email)) ||
      (await this.getUserByEmailOrUsername(user.username))
    )
      throw new ConflictException(
        'Username or email address is already in use',
      );

    user.salt = randomBytes(16).toString('hex');
    user.password = this.saltAndHash(user.password, user.salt);

    const rankUser: Rank = await this.rankService.findOne(rank);
    // If error add user rank
    const insertRntity = { ...user, rank: rankUser };
    await this.userService.insert(insertRntity);

    const { password, salt, ...result } = insertRntity;
    return this.logIn(result);
  }

  async logIn(user: User): Promise<accessToken> {
    const payload = {
      id: user.id,
      username: user.username,
      rank: user.rank.rank,
      permissionsLvl: user.rank.permissionsLvl,
    };
    return {
      message: 'success',
      statusCode: 200,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
