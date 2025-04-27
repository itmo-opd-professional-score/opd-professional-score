interface TestBlockJwtBodyDto {
  testId: number;
  presetId: number;
}

export interface CreateTestBlockLinkJwtDto {
  testBlockId: number;
  testBlockBody: TestBlockJwtBodyDto[];
}
