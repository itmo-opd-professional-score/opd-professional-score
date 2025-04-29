import { Inject, Injectable } from '@nestjs/common';
import { TestBlockEntity } from '../entities/test-block.entity';
import { TestBlockNotFoundException } from '../exceptions/test/test-blocks/test-block-not-found.exception';
import { UserToTestBlockEntity } from '../entities/user-to-test-block.entity';
import { User } from '../entities/user.entity';
import { UserNotFoundException } from '../exceptions/users/user-not-found.exception';
import { JwtTestBlockLinksGeneratorUtil } from '../utils/jwt-test-block-links-generator.util';

@Injectable()
export class TestBlockProvider {
  constructor(
    @Inject(JwtTestBlockLinksGeneratorUtil)
    private linkGenerator: JwtTestBlockLinksGeneratorUtil,
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
}
