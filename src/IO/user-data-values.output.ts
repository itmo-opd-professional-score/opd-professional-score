import { RolesEnum } from '../config/enums/roles.enum';

export class UserDataValuesOutput {
  id: number;
  username: string;
  email: string;
  role: RolesEnum;
  password: string;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
}
