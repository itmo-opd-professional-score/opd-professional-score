export interface CreateSltDto {
  userId: number | null;
  averageCallbackTime: number;
  allSignals: number;
  misclicks: number;
  dispersion: number;
}
