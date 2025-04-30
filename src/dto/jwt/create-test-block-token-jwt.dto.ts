import { JwtTestBlockDto } from './jwt-test-block.dto';

export interface CreateTestBlockTokenJwtDto {
  tests: JwtTestBlockDto[];
  userIDs: number[];
}
