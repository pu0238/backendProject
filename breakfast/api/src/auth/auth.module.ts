import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy"
import { UserModule } from "../user/user.module";
import { JwtStrategy } from "./strategies/jwt.stretegy";
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RankService } from "../rank/rank.service";
import { RankModule } from "src/rank/rank.module";
dotenv.config();
@Module({
  imports: [
    UserModule,
    PassportModule,
    RankModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: "10m" }
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, ConfigService, JwtStrategy, RankService],
})
export class AuthModule {}
