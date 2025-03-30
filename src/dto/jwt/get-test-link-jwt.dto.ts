export interface GetTestLinkJwtDto {
  testId: number | null;
  testType: string;
  iat: number;
  exp: number;
}
