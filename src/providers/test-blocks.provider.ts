import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TestTypesProvider } from './test-types.provider';
import { JwtUttbTokenGeneratorUtil } from '../utils/jwt-uttb-token-generator.util';
import { JwtTestBlockTokenGeneratorUtil } from '../utils/jwt-test-block-token-generator.util';
import { TestBlockEntity } from '../entities/test-block.entity';
import { UserToTestBlockEntity } from '../entities/user-to-test-block.entity';
import { TestBlockNotFoundException } from '../exceptions/test/test-blocks/test-block-not-found.exception';
import { CreateTestBlockDto } from '../dto/test/test-blocks/create-test-block.dto';
import { BasicHttpException } from '../exceptions/basic-http.exception';
import { CreateTestBlockTokenDto } from '../dto/jwt/test-block/create-test-block-token.dto';
import { CreateUttbTokenDto } from '../dto/jwt/user-to-test-block/create-uttb-token.dto';
import { AssignUsersDto } from '../dto/test/test-blocks/assign-users.dto';
import { UpdateTestBlockDto } from '../dto/test/test-blocks/update-test-block.dto';
import { User } from '../entities/user.entity';
import { UserNotFoundException } from '../exceptions/users/user-not-found.exception';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';

@Injectable()
export class TestBlocksProvider {
  constructor(
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
    @Inject(JwtTestBlockTokenGeneratorUtil)
    private jwtTestBlockTokenGeneratorUtil: JwtTestBlockTokenGeneratorUtil,
    @Inject(JwtUttbTokenGeneratorUtil)
    private jwtUttbTokenGeneratorUtil: JwtUttbTokenGeneratorUtil,
  ) {}

  public async getAllTestBlocks() {
    return await TestBlockEntity.findAll();
  }

  public async getTestBlockById(id: number) {
    const testBlock = await TestBlockEntity.findOne({ where: { id: id } });
    if (testBlock == null) throw new TestBlockNotFoundException(id, 'id');

    return testBlock;
  }

  public async getTestBlockByToken(token: string) {
    const testBlock = await TestBlockEntity.findOne({
      where: { testBlockToken: token },
    });

    if (testBlock == null)
      throw new TestBlockNotFoundException(token, 'testBlockToken');

    return testBlock;
  }

  public async getAllAssignedTestBlocks() {
    return await UserToTestBlockEntity.findAll();
  }

  public async getAllAssignedTestBlockByUserId(userId: number) {
    const user = await User.findOne({ where: { id: userId } });
    if (user == null) throw new UserNotFoundException(userId, 'id');

    return UserToTestBlockEntity.findAll({ where: { userId: userId } });
  }

  public async createTestBlock(data: CreateTestBlockDto) {
    let errors = 0;

    await Promise.all(
      data.tests.map(async (test) => {
        const testType = await this.testTypesProvider.getTypeByName(test.name);
        if (testType == null) errors++;
      }),
    );

    if (errors > 0)
      throw new BasicHttpException(
        HttpStatus.NOT_FOUND,
        'Some test types not found',
      );

    const payload: CreateTestBlockTokenDto = { tests: data.tests };
    const testBlockToken =
      this.jwtTestBlockTokenGeneratorUtil.createToken(payload);
    const testBlock = await TestBlockEntity.create({ testBlockToken });

    if (data.userIDs.length > 0) {
      await this.assignUsers({
        testBlockId: testBlock.id,
        userIDs: data.userIDs,
      });
    } else {
      await this.assignUsers({
        testBlockId: testBlock.id,
        userIDs: [999999],
      });
    }

    return testBlock;
  }

  public async assignUsers(data: AssignUsersDto) {
    const testBlock = await this.getTestBlockById(data.testBlockId);
    const tests = this.jwtTestBlockTokenGeneratorUtil.decode(
      testBlock.testBlockToken,
    ).tests;

    await Promise.all(
      data.userIDs.map(async (userId) => {
        const payload1: CreateUttbTokenDto = {
          tests: tests,
          userId: userId,
        };

        const token = this.jwtUttbTokenGeneratorUtil.createToken(payload1);
        await UserToTestBlockEntity.create({
          testBlockToken: token,
          userId: userId,
          testBlockId: testBlock.id,
        });
      }),
    );
  }

  public async updateTestBlock(data: UpdateTestBlockDto) {
    const user = await User.findOne({ where: { id: data.userId } });
    if (user == null) throw new UserNotFoundException(data.userId, 'id');

    const oldValue = await UserToTestBlockEntity.findOne({
      where: { testBlockId: data.testBlockId, userId: data.userId },
    });

    if (oldValue == null)
      throw new BasicHttpException(
        HttpStatus.NOT_FOUND,
        'Information about test-block not found.',
      );

    const tests = this.jwtTestBlockTokenGeneratorUtil.decode(
      oldValue.testBlockToken,
    ).tests;

    await Promise.all(
      tests.map((test) => {
        if (test.name == data.updatedTest.name) {
          test.available = data.updatedTest.available;
        }
      }),
    );

    const payload: CreateUttbTokenDto = {
      tests: tests,
      userId: data.userId,
    };
    const newToken = this.jwtUttbTokenGeneratorUtil.createToken(payload);

    await UserToTestBlockEntity.update(
      { testBlockToken: newToken },
      { where: { id: oldValue?.id } },
    );

    return new BasicSuccessfulResponse(newToken);
  }
}
