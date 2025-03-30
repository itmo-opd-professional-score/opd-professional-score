export interface JwtTestLinkInputDto {
  testId: number | null;
  testType: string;
  iat: number;
  exp: number;
}
