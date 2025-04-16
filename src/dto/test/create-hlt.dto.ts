import { BasicTestCreationDto } from './basic-test-creation.dto';

export interface CreateHltDto extends BasicTestCreationDto {
  userId: number | null;
  averageCallbackTime: number;
  allSignals: number;
  misclicks: number;
  mistakes: number;
  dispersion: number;
  valid: boolean;
}
