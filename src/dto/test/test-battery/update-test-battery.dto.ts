import { TestBatteryUpdatedDataDto } from './test-battery-updated-data.dto';

export interface UpdateTestBatteryDto {
  testBatteryId: number;
  updatedData: TestBatteryUpdatedDataDto;
}
