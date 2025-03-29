export interface CreateHltDto {
  userId: number | null;
  averageCallbackTime: number;
  allSignals: number;
  misclicks: number;
  mistakes: number;
  dispersion: number;
  valid: boolean;
}
