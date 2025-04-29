import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateTestBlockTokenJwtDto } from '../dto/jwt/create-test-block-token-jwt.dto';
import { GetTestBlockJwtDto } from '../dto/jwt/get-test-block-jwt.dto';

@Injectable()
export class JwtTestBlockGeneratorUtil {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  public createToken(data: CreateTestBlockTokenJwtDto) {
    return this.jwtService.sign(data);
  }

  public decodeToken(token: string) {
    return this.jwtService.verify<GetTestBlockJwtDto>(token, {
      ignoreExpiration: false,
    });
  }
}
