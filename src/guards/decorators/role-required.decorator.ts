import { RolesEnum } from '../../config/enums/roles.enum';
import { SetMetadata } from '@nestjs/common';

export const RoleRequired = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
