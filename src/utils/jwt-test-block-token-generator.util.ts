import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateTestBlockTokenDto } from '../dto/jwt/test-block/create-test-block-token.dto';
import { GetTestBlockTokenDto } from '../dto/jwt/test-block/get-test-block-token.dto';

@Injectable()
export class JwtTestBlockTokenGeneratorUtil {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  public createToken(data: CreateTestBlockTokenDto) {
    return this.jwtService.sign(data);
  }

  public decode(token: string) {
    return this.jwtService.verify<GetTestBlockTokenDto>(token, {
      ignoreExpiration: false,
    });
  }
}
