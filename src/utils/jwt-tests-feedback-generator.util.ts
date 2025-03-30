import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateTestFeedbackJwtDto } from '../dto/jwt/create-test-feedback-jwt.dto';
import { GetTestFeedbackJwtDto } from '../dto/jwt/get-test-feedback-jwt.dto';

@Injectable()
export class JwtTestsFeedbackGeneratorUtil {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  public createToken(data: CreateTestFeedbackJwtDto) {
    return this.jwtService.sign(data);
  }

  public decodeToken(token: string) {
    return this.jwtService.verify<GetTestFeedbackJwtDto>(token, {
      ignoreExpiration: false,
    });
  }
}
