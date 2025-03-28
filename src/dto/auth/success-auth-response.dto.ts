import { RolesEnum } from '../../config/enums/roles.enum';

export class SuccessAuthResponseDto {
  token: string;
  role: RolesEnum;
}
