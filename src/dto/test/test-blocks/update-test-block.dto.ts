import { UpdatedTestsDto } from './updated-tests.dto';

export interface UpdateTestBlockDto {
  testBlockId: number;
  userId: number;
  updatedTest: UpdatedTestsDto;
}
