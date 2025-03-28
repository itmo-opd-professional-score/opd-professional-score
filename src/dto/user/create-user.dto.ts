import { RolesEnum } from '../../config/enums/roles.enum';
import { GenderEnum } from '../../config/enums/gender.enum';

export class CreateUserDto {
  username: string;
  email: string;
  age: Date;
  gender: GenderEnum;
  role: RolesEnum;
  password: string;
  isBanned: boolean;
}
