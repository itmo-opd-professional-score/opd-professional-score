import { BasicHttpException } from '../../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class TestBatteryNotFoundException<
  T extends string | number,
> extends BasicHttpException {
  constructor(param: T, paramName: string) {
    super(
      HttpStatus.NOT_FOUND,
      `Test battery with ${paramName}: '${param.toString()}' not found.`,
    );
  }
}
