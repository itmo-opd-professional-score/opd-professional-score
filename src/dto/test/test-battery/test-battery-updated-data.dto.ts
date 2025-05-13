import { UpdateTestInTestBatteryDto } from './update-test-in-test-battery.dto';

export interface TestBatteryUpdatedDataDto {
  name?: string;
  description?: string;
  tests: UpdateTestInTestBatteryDto[];
}
