import { Module } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { VerificationCodes } from '../entities/verification-codes.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';
import { AuthProvider } from '../providers/auth.provider';
import { BcryptUtil } from '../utils/bcrypt.util';
import { jwtConfig } from '../config/jwt.conf';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([User, VerificationCodes]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.jwtSecret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthProvider, BcryptUtil, JwtStrategy],
  exports: [JwtModule, AuthProvider],
})
export class AuthModule {}
