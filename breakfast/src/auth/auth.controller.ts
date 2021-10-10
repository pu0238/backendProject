import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { SingInValidator } from './dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
    ) {}

  @Post('singin')
  async singIn(/*@Body() body: SingInValidator*/): Promise<any> {
    //await this.userService.s()
    console.log(await this.userService.findAll())
    console.log(await this.userService.s())

    return 'singIn'//await this.authService.singIn(body);
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Request() req): Promise<any> {
    return 'login'//await this.authService.logIn(req.user);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async protected(@Request() req): Promise<any> {
    return req.user;
  }
}
