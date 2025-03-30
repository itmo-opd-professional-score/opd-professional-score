export interface GetTestFeedbackJwtDto {
  testType: string;
  testId: number;
  iat: number;
  exp: number;
}
