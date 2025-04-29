import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateTestBlockLinkJwtDto } from '../dto/jwt/create-test-block-link-jwt.dto';
import { GetTestBlockLinkJwtDto } from '../dto/jwt/get-test-block-link-jwt.dto';

@Injectable()
export class JwtTestBlockLinksGeneratorUtil {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  public createToken(data: CreateTestBlockLinkJwtDto) {
    return this.jwtService.sign(data);
  }

  public decodeToken(token: string) {
    return this.jwtService.verify<GetTestBlockLinkJwtDto>(token, {
      ignoreExpiration: false,
    });
  }
}
