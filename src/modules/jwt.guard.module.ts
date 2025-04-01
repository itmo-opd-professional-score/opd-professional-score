import { Module } from '@nestjs/common';
import { jwtConfig } from '../config/jwt.conf';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthStrategy } from '../strategies/jwt.auth.strategy';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';
import { JwtTestLinksGeneratorUtil } from '../utils/jwt-test-links-generator.util';
import { JwtTestsFeedbackGeneratorUtil } from '../utils/jwt-tests-feedback-generator.util';
import { JwtTestBlockGeneratorUtil } from '../utils/jwt-test-block-generator.util';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConfig.jwtSecret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
  ],
  providers: [
    JwtAuthStrategy,
    JwtDecoderUtil,
    JwtTestLinksGeneratorUtil,
    JwtTestsFeedbackGeneratorUtil,
    JwtTestBlockGeneratorUtil,
  ],
  exports: [
    JwtModule,
    JwtAuthStrategy,
    JwtDecoderUtil,
    JwtTestLinksGeneratorUtil,
    JwtTestsFeedbackGeneratorUtil,
    JwtTestBlockGeneratorUtil,
  ],
})
export class JwtGuardModule {}
