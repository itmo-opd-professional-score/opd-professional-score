import { JwtBigTestBlockDto } from './jwt-big-test-block.dto';

export interface GetTestBlockJwtDto {
  tests: JwtBigTestBlockDto[];
  userIDs: number[];
  iat: number;
  exp: number;
}
