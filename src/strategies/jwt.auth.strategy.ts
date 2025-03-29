import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from '../config/jwt.conf';
import { ValidateJwtTokenDto } from '../dto/auth/validate-jwt-token.dto';
import { IncorrectTokenException } from '../exceptions/auth/incorrect-token.exception';
import { User } from '../entities/user.entity';
import { UserNotFoundException } from '../exceptions/users/user-not-found.exception';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.jwtSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: ValidateJwtTokenDto) {
    const user = await User.findOne({
      where: { id: payload.id },
    });
    if (user == null)
      throw new UserNotFoundException(payload.id, 'id not found');

    if (!(user?.email == payload.email && user.role == payload.role)) {
      throw new IncorrectTokenException('Token was damaged');
    }

    return user;
  }
}
