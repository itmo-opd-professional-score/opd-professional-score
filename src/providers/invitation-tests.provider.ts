import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'sequelize-typescript';
import { isNumber } from '@nestjs/common/utils/shared.utils';
import { JwtTestsFeedbackGeneratorUtil } from '../utils/jwt-tests-feedback-generator.util';
import { NotExistsException } from '../exceptions/common/not-exists.exception';
import { CreateTestFeedbackJwtDto } from '../dto/jwt/create-test-feedback-jwt.dto';
import { TestTypesProvider } from './test-types.provider';
import { TestTypeNotFoundException } from '../exceptions/test/test-types/test-type-not-found.exception';

@Injectable()
export class InvitationTestsProvider {
  constructor(
    @Inject(JwtTestsFeedbackGeneratorUtil)
    private feedbackGeneratorUtil: JwtTestsFeedbackGeneratorUtil,
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
  ) {}

  public async generateFeedbackToken<T extends Model>(test: T) {
    let testTypeId: number;

    if ('testTypeId' in test && isNumber(test.testTypeId)) {
      testTypeId = test.testTypeId;
    } else
      throw new NotExistsException(
        `'Field "testTypeId" doesn't belongs to test data`,
      );

    const testType = await this.testTypesProvider.getTypeById(testTypeId);

    if (testType == null) throw new TestTypeNotFoundException(testTypeId, 'id');

    const payload: CreateTestFeedbackJwtDto = {
      testType: testType?.name,
      testId: isNumber(test.id) ? test.id : 0,
    };

    return this.feedbackGeneratorUtil.createToken(payload);
  }
}
