import { Module } from '@nestjs/common';
import { jwtConfig } from '../config/jwt.conf';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthStrategy } from '../strategies/jwt.auth.strategy';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';
import { JwtTestLinksGeneratorUtil } from '../utils/jwt-test-links-generator.util';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConfig.jwtSecret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
  ],
  providers: [JwtAuthStrategy, JwtDecoderUtil, JwtTestLinksGeneratorUtil],
  exports: [
    JwtModule,
    JwtAuthStrategy,
    JwtDecoderUtil,
    JwtTestLinksGeneratorUtil,
  ],
})
export class JwtGuardModule {}
