import { JwtTestBlockDto } from '../../jwt/jwt-test-block.dto';

export interface CreateTestBlockDto {
  tests: JwtTestBlockDto[];
  userIDs: number[];
}
