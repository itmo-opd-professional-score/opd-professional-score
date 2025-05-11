export interface CreateSttDto {
  userId: number;
  allSignals: number;
  successCount: number;
  averageCallbackTime: number;
  timeDeviation: number;
  testType: string;
}
