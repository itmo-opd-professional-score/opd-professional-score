import { Body, Controller, Inject, Patch, Post } from '@nestjs/common';
import { UpdateTestUserIdStrategy } from '../strategies/update-test-user-id.strategy';
import { UpdateUserIdsDto } from '../dto/test/update-user-ids.dto';
import { CreateTestLinkJwtDto } from '../dto/jwt/create-test-link-jwt.dto';
import { JwtTestLinksGeneratorUtil } from '../utils/jwt-test-links-generator.util';

@Controller('/test')
export class TestsController {
  constructor(
    @Inject(UpdateTestUserIdStrategy)
    private userIdStrategy: UpdateTestUserIdStrategy,
    @Inject(JwtTestLinksGeneratorUtil)
    private jwtLinksGenerator: JwtTestLinksGeneratorUtil,
  ) {}

  @Patch('/updateUserIDs')
  public async updateUserIDs(@Body() data: UpdateUserIdsDto) {
    return await this.userIdStrategy.updateUserIDs(data);
  }

  @Post('/getInvitationTestToken')
  public async createTestLinkJwt(@Body() data: CreateTestLinkJwtDto) {
    return await this.jwtLinksGenerator.createToken(data);
  }
}
