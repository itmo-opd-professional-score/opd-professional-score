import { JwtBigTestBlockDto } from '../../jwt/jwt-big-test-block.dto';

export interface CreateTestBlockDto {
  tests: JwtBigTestBlockDto[];
  userIDs: number[];
}
