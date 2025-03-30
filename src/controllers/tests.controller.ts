import { Body, Controller, Inject, Patch } from '@nestjs/common';
import { UpdateTestUserIdStrategy } from '../strategies/update-test-user-id.strategy';
import { UpdateUserIdsDto } from '../dto/test/update-user-ids.dto';

@Controller('/test')
export class TestsController {
  constructor(
    @Inject(UpdateTestUserIdStrategy)
    private userIdStrategy: UpdateTestUserIdStrategy,
  ) {}

  @Patch('/updateUserIDs')
  public async updateUserIDs(@Body() data: UpdateUserIdsDto) {
    return await this.userIdStrategy.updateUserIDs(data);
  }
}
