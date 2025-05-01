import { AccelerationModesEnum } from '../../../config/enums/acceleration-modes.enum';

export interface CreateTestSetupDto {
  testName: string;
  testTypeId: number;
  duration: number;
  showTimer: boolean;
  showTotalResults: boolean;
  showProgress: boolean;
  accelerationMode: AccelerationModesEnum;
}
