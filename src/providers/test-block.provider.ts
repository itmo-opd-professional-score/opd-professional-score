import { Inject, Injectable } from '@nestjs/common';
import { JwtTestBlockGeneratorUtil } from '../utils/jwt-test-block-generator.util';
import { TestBlockEntity } from '../entities/test-block.entity';
import { TestBlockNotFoundException } from '../exceptions/test/test-blocks/test-block-not-found.exception';
import { UserToTestBlockEntity } from '../entities/user-to-test-block.entity';
import { CreateTestBlockDto } from '../dto/test/test-blocks/create-test-block.dto';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { AssignUsersToTestBlockDto } from '../dto/test/test-blocks/assign-users-to-test-block.dto';
import { User } from '../entities/user.entity';
import { UserNotFoundException } from '../exceptions/users/user-not-found.exception';

@Injectable()
export class TestBlockProvider {
  constructor(
    @Inject(JwtTestBlockGeneratorUtil)
    private testBlockGenerator: JwtTestBlockGeneratorUtil,
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

  public async createTestBlock(data: CreateTestBlockDto) {
    const token = await this.testBlockGenerator.createToken(data.tests);
    const testBlock = await TestBlockEntity.create({
      testBlockToken: token,
    });

    await this.assignTestBlockToUsers({
      testBlockId: testBlock.id,
      userIDs: data.userIDs,
    });
    return new BasicSuccessfulResponse(testBlock);
  }

  public async assignTestBlockToUsers(data: AssignUsersToTestBlockDto) {
    const testBlock = await this.getById(data.testBlockId);

    await Promise.all(
      data.userIDs.map(async (userId) => {
        await UserToTestBlockEntity.create({
          testBlockId: data.testBlockId,
          testBlockToken: testBlock.testBlockToken,
          userId: userId,
        });
      }),
    );

    return new BasicSuccessfulResponse('Users assigned successfully.');
  }

  public async delete(id: number) {
    await TestBlockEntity.destroy({ where: { id: id } });

    return new BasicSuccessfulResponse('Test block deleted successfully.');
  }
}
