export interface CreateRdoDto {
  userId: number | null;
  testType: string;
  averageCallbackTime: number;
  dispersion: number;
  allSignals: number;
  mistakes: number;
}
