export interface CreateSttDto {
  userId: number;
  allSignals: number;
  successCount: number;
  averageCallbackTime: number;
  dispersion: number;
  testType: string;
}
