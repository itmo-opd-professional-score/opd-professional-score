import { BasicTestCreationDto } from './basic-test-creation.dto';

export interface CreateRdoDto extends BasicTestCreationDto {
  userId: number | null;
  testType: string;
  averageCallbackTime: number;
  dispersion: number;
  allSignals: number;
  mistakes: number;
}
