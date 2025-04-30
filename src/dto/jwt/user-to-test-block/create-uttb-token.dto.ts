import { JwtTestDto } from '../jwt-test.dto';

export interface CreateUttbTokenDto {
  tests: JwtTestDto[];
  userId: number;
}
