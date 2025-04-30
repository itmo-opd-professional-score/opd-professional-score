import { JwtTestDto } from '../../jwt/jwt-test.dto';

export interface CreateTestBlockDto {
  tests: JwtTestDto[];
  userIDs: number[];
}
