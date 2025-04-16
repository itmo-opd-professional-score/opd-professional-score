import { BasicTestCreationDto } from './basic-test-creation.dto';

export interface CreateAtDto extends BasicTestCreationDto {
  userId: number | null;
  averageCallbackTime: number;
  dispersion: number;
  allSignals: number;
  mistakes: number;
}
