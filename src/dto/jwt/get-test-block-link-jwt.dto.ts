import { JwtTestBlockDto } from './jwt-test-block.dto';

export interface GetTestBlockLinkJwtDto {
  testBlockId: number;
  testBlockBody: JwtTestBlockDto[];
  iat: number;
  exp: number;
}
