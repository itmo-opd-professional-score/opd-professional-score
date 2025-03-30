export interface GetJwtTestLinkDto {
  testId: number | null;
  testType: string;
  iat: number;
  exp: number;
}
