import { BasicTestCreationDto } from './basic-test-creation.dto';

export interface CreateSltDto extends BasicTestCreationDto {
  userId: number | null;
  averageCallbackTime: number;
  allSignals: number;
  misclicks: number;
  dispersion: number;
}
