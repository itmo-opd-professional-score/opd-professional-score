import { Inject, Injectable } from '@nestjs/common';
import { JwtTestLinkOutputDto } from '../dto/jwt/jwt-test-link-output.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtTestLinkInputDto } from '../dto/jwt/jwt-test-link-input.dto';

@Injectable()
export class JwtTestLinksGeneratorUtil {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  public createToken(data: JwtTestLinkOutputDto): string {
    return this.jwtService.sign(data);
  }

  public decodeToken(token: string) {
    return this.jwtService.verify<JwtTestLinkInputDto>(token, {
      ignoreExpiration: false,
    });
  }
}
