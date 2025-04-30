import { JwtTestBlockDto } from './jwt-test-block.dto';

export interface GetTestBlockJwtDto {
  tests: JwtTestBlockDto[];
  userIDs: number[];
  iat: number;
  exp: number;
}
