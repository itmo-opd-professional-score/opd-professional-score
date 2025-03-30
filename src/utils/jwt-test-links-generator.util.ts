import { Inject, Injectable } from '@nestjs/common';
import { CreateTestLinkDto } from '../dto/jwt/create-test-link.dto';
import { JwtService } from '@nestjs/jwt';
import { GetJwtTestLinkDto } from '../dto/jwt/get-jwt-test-link.dto';

@Injectable()
export class JwtTestLinksGeneratorUtil {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  public createToken(data: CreateTestLinkDto): string {
    return this.jwtService.sign(data);
  }

  public decodeToken(token: string) {
    return this.jwtService.verify<GetJwtTestLinkDto>(token, {
      ignoreExpiration: false,
    });
  }
}
