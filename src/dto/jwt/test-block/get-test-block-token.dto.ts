import { JwtTestDto } from '../jwt-test.dto';

export interface GetTestBlockTokenDto {
  tests: JwtTestDto[];
  iat: number;
  exp: number;
}
