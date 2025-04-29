import { JwtBigTestBlockDto } from './jwt-big-test-block.dto';

export interface CreateTestBlockTokenJwtDto {
  tests: JwtBigTestBlockDto[];
  userIDs: number[];
}
