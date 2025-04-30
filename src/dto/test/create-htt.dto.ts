export interface CreateHttDto {
  userId: number;
  duration: number;
  totalOverlapTime: number;
  bestOverlap: number;
  averageOverlap: number;
  overlapCount: number;
  successRate: number;
}
