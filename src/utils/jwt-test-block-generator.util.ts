import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateTestBlockJwtDto } from '../dto/jwt/create-test-block-jwt.dto';
import { TestTypes } from '../entities/test-types.entity';
import { InvalidEnumSyntaxException } from '../exceptions/validation/invalid-enum-syntax.exception';
import { GetTestBlockJwtDto } from '../dto/jwt/get-test-block-jwt.dto';

@Injectable()
export class JwtTestBlockGeneratorUtil {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  public async createToken(data: CreateTestBlockJwtDto) {
    let approvedTests = '';

    await Promise.all(
      data.tests.map(async (test) => {
        const t = await TestTypes.findOne({ where: { name: test } });
        if (t == null) {
          throw new InvalidEnumSyntaxException('TestTypes', test);
        } else {
          approvedTests += `${test} `;
        }
      }),
    );

    const payload = {
      tests: approvedTests.trim(),
    };

    return this.jwtService.sign(payload);
  }

  public decodeToken(token: string) {
    return this.jwtService.verify<GetTestBlockJwtDto>(token, {
      ignoreExpiration: true,
    });
  }
}
