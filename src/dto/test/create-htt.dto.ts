export interface CreateHttDto {
  userId: number;
  testType: string;
  duration: number;
  totalOverlapTime: number;
  bestOverlap: number;
  averageOverlap: number;
  overlapCount: number;
  successRate: number;
}
