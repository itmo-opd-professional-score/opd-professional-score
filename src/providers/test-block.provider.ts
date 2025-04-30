import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TestBlockEntity } from '../entities/test-block.entity';
import { TestBlockNotFoundException } from '../exceptions/test/test-blocks/test-block-not-found.exception';
import { UserToTestBlockEntity } from '../entities/user-to-test-block.entity';
import { User } from '../entities/user.entity';
import { UserNotFoundException } from '../exceptions/users/user-not-found.exception';
import { JwtTestBlockLinksGeneratorUtil } from '../utils/jwt-test-block-links-generator.util';
import { CreateTestBlockDto } from '../dto/test/test-blocks/create-test-block.dto';
import { TestTypesProvider } from './test-types.provider';
import { BasicHttpException } from '../exceptions/basic-http.exception';
import { JwtTestBlockGeneratorUtil } from '../utils/jwt-test-block-generator.util';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { AssignUsersToTestBlockDto } from '../dto/test/test-blocks/assign-users-to-test-block.dto';
import { CreateTestBlockLinkJwtDto } from '../dto/jwt/create-test-block-link-jwt.dto';

@Injectable()
export class TestBlockProvider {
  constructor(
    @Inject(JwtTestBlockLinksGeneratorUtil)
    private linkGenerator: JwtTestBlockLinksGeneratorUtil,
    @Inject(JwtTestBlockGeneratorUtil)
    private jwtTestBlockGeneratorUtil: JwtTestBlockGeneratorUtil,
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
  ) {}

  public async getAll() {
    return await TestBlockEntity.findAll();
  }

  public async getById(id: number) {
    const testBlock = await TestBlockEntity.findOne({ where: { id: id } });
    if (testBlock == null) throw new TestBlockNotFoundException(id, 'id');

    return testBlock;
  }

  public async getAllUsersByTokenId(testBlockId: number) {
    const testBlock = await this.getById(testBlockId);
    return await UserToTestBlockEntity.findAll({
      where: { testBlockToken: testBlock.testBlockToken },
    });
  }

  public async getByUserId(userId: number) {
    const user = await User.findOne({ where: { id: userId } });
    if (user == null) throw new UserNotFoundException(userId, 'id');

    return await UserToTestBlockEntity.findAll({
      where: { userId: userId },
    });
  }

  public async create(data: CreateTestBlockDto) {
    let errors = 0;

    await Promise.all(
      data.tests.map(async (test) => {
        try {
          await this.testTypesProvider.getTypeByName(test.name);
        } catch {
          errors++;
        }
      }),
    );

    if (errors > 0)
      throw new BasicHttpException(
        HttpStatus.BAD_REQUEST,
        'Some test types not found',
      );

    const token = this.jwtTestBlockGeneratorUtil.createToken(data);
    const testBlock = await TestBlockEntity.create({ testBlockToken: token });

    for (const userId of data.userIDs) {
      const user = User.findOne({ where: { id: userId } });
      if (user == null)
        throw new UserNotFoundException(
          userId,
          `User with id ${userId} not found.`,
        );
    }

    const payload: AssignUsersToTestBlockDto = {
      testBlockId: testBlock.id,
      userIDs: data.userIDs,
    };
    await this.assignUsers(payload);

    return new BasicSuccessfulResponse(testBlock);
  }

  public async assignUsers(data: AssignUsersToTestBlockDto) {
    const testBlock = await this.getById(data.testBlockId);
    let errors = 0;

    await Promise.all(
      data.userIDs.map(async (userID) => {
        const user = await User.findOne({ where: { id: userID } });
        if (user == null) errors++;
      }),
    );

    if (errors > 0)
      throw new BasicHttpException(
        HttpStatus.BAD_REQUEST,
        'Some users not found. Request rejected',
      );

    for (const userId of data.userIDs) {
      await UserToTestBlockEntity.create({
        testBlockId: testBlock.id,
        testBlockToken: testBlock.testBlockToken,
        userId: userId,
      });
    }

    return new BasicSuccessfulResponse('Users assigned successfully.');
  }

  public async createTestBlockLink(data: CreateTestBlockLinkJwtDto) {
    let errors = 0;
    await this.getById(data.testBlockId);

    await Promise.all(
      data.testBlockBody.map(async (test) => {
        const testType = await this.testTypesProvider.getTypeByName(test.name);
        if (testType == null) errors++;
      }),
    );

    if (errors > 0)
      throw new BasicHttpException(
        HttpStatus.BAD_REQUEST,
        `Some test types not found. Request rejected`,
      );

    const token = this.linkGenerator.createToken(data);

    return new BasicSuccessfulResponse(token);
  }

  public async deleteTestBlock(testBlockId: number) {
    const testBlock = await this.getById(testBlockId);
    await TestBlockEntity.destroy({ where: { id: testBlock.id } });

    return new BasicSuccessfulResponse('Test block deleted successfully.');
  }
}
