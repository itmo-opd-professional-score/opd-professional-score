import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUttbTokenDto } from '../dto/jwt/user-to-test-block/create-uttb-token.dto';
import { GetUttbTokenDto } from '../dto/jwt/user-to-test-block/get-uttb-token.dto';

@Injectable()
export class JwtUttbTokenGeneratorUtil {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  public createToken(data: CreateUttbTokenDto) {
    return this.jwtService.sign(data);
  }

  public decode(token: string) {
    return this.jwtService.verify<GetUttbTokenDto>(token, {
      ignoreExpiration: false,
    });
  }
}
