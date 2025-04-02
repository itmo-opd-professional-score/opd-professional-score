import { CreateTestBlockJwtDto } from '../../jwt/create-test-block-jwt.dto';

export interface CreateTestBlockDto {
  tests: CreateTestBlockJwtDto;
  userIDs: number[];
}
