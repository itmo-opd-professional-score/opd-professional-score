import { JwtTestDto } from '../jwt-test.dto';

export interface GetUttbTokenDto {
  tests: JwtTestDto[];
  userId: number;
  iat: number;
  exp: number;
}
