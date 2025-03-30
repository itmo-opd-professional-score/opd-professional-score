import { Inject, Injectable } from '@nestjs/common';
import { CreateTestLinkJwtDto } from '../dto/jwt/create-test-link-jwt.dto';
import { JwtService } from '@nestjs/jwt';
import { GetTestLinkJwtDto } from '../dto/jwt/get-test-link-jwt.dto';

@Injectable()
export class JwtTestLinksGeneratorUtil {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  public createToken(data: CreateTestLinkJwtDto): string {
    return this.jwtService.sign(data);
  }

  public decodeToken(token: string) {
    return this.jwtService.verify<GetTestLinkJwtDto>(token, {
      ignoreExpiration: false,
    });
  }
}
