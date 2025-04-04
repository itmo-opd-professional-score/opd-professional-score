import { Module } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { VerificationCodes } from '../entities/verification-codes.entity';
import { UserProvider } from '../providers/user.provider';
import { UserController } from '../controllers/user.controller';
import { BcryptUtil } from '../utils/bcrypt.util';
import { MailerProvider } from '../providers/mailer.provider';
import { CodeGeneratorUtil } from '../utils/code-generator.util';
import { AuthCodesStrategy } from '../strategies/auth-codes.strategy';
import { JwtGuardModule } from './jwt.guard.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, VerificationCodes]),
    JwtGuardModule,
  ],
  providers: [
    UserProvider,
    BcryptUtil,
    MailerProvider,
    AuthCodesStrategy,
    CodeGeneratorUtil,
  ],
  controllers: [UserController],
  exports: [UserProvider, MailerProvider],
})
export class UserModule {}
