import { GenderEnum } from '../../config/enums/gender.enum';

export class UpdatedUserDataDto {
  username?: string;
  email?: string;
  age?: Date;
  gender?: GenderEnum;
}
