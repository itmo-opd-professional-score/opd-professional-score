import { RolesEnum } from '../../config/enums/roles.enum';
import { GenderEnum } from '../../config/enums/gender.enum';

export class UserPayload {
  id: number;
  username: string;
  email: string;
  role: RolesEnum;
  gender: GenderEnum | null;
  age: Date | null;
  isBanned: boolean;
}
