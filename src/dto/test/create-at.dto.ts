export interface CreateAtDto {
  userId: number | null;
  averageCallbackTime: number;
  dispersion: number;
  allSignals: number;
  mistakes: number;
}
