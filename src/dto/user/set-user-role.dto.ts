import { RolesEnum } from '../../config/enums/roles.enum';

export class SetUserRoleDto {
  id: number;
  role: RolesEnum;
}
