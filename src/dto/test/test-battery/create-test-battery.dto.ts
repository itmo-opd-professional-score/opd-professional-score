import { CreateTestInTestBatteryDto } from './create-test-in-test-battery.dto';

export interface CreateTestBatteryDto {
  name: string;
  description: string;
  tests: CreateTestInTestBatteryDto[];
}