import { Inject, Injectable } from '@nestjs/common';
import { CreateTestLinkJwtDto } from '../dto/jwt/create-test-link-jwt.dto';
import { JwtService } from '@nestjs/jwt';
import { GetTestLinkJwtDto } from '../dto/jwt/get-test-link-jwt.dto';
import { InvalidEnumSyntaxException } from '../exceptions/validation/invalid-enum-syntax.exception';
import { TestTypes } from '../entities/test-types.entity';

@Injectable()
export class JwtTestLinksGeneratorUtil {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  public async createToken(data: CreateTestLinkJwtDto): Promise<string> {
    const localTestTypes = await TestTypes.findAll({
      where: { name: data.testType.trim() },
    });

    if (localTestTypes.length == 0)
      throw new InvalidEnumSyntaxException('TestTypes', data.testType);

    return this.jwtService.sign(data);
  }

  public decodeToken(token: string) {
    return this.jwtService.verify<GetTestLinkJwtDto>(token, {
      ignoreExpiration: false,
    });
  }
}
