import { RolesEnum } from '../../config/enums/roles.enum';

export class ValidateJwtTokenDto {
  id: number;
  email: string;
  role: RolesEnum;
}
