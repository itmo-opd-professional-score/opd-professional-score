interface TestBlockJwtBodyDto {
  testId: number;
  presetId: number;
}

export interface GetTestBlockLinkJwtDto {
  testBlockId: number;
  testBlockBody: TestBlockJwtBodyDto[];
  iat: number;
  exp: number;
}
