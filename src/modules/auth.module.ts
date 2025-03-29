import { Module } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { VerificationCodes } from '../entities/verification-codes.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../controllers/auth.controller';
import { AuthProvider } from '../providers/auth.provider';
import { BcryptUtil } from '../utils/bcrypt.util';
import { AuthCodesStrategy } from '../strategies/auth-codes.strategy';
import { CodeGeneratorUtil } from '../utils/code-generator.util';
import { JwtGuardModule } from './jwt.guard.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, VerificationCodes]),
    UserModule,
    PassportModule,
    JwtGuardModule,
  ],
  controllers: [AuthController],
  providers: [AuthProvider, BcryptUtil, AuthCodesStrategy, CodeGeneratorUtil],
  exports: [],
})
export class AuthModule {}
