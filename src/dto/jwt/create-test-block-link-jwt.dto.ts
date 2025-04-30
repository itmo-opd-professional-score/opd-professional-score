import { JwtTestBlockDto } from './jwt-test-block.dto';

export interface CreateTestBlockLinkJwtDto {
  testBlockId: number;
  testBlockBody: JwtTestBlockDto[];
}
