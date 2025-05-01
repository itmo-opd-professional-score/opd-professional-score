import { AccelerationModesEnum } from '../../../config/enums/acceleration-modes.enum';

export interface UpdateSetupDto {
  id: number;
  updated: Updatable;
}

interface Updatable {
  testName?: string;
  testTypeId?: number;
  duration?: number;
  showTimer?: boolean;
  showTotalResults?: boolean;
  showProgress?: boolean;
  accelerationMode?: AccelerationModesEnum;
}
