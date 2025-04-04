import { BasicHttpException } from '../../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class TestBlockNotFoundException<
  T extends string | number,
> extends BasicHttpException {
  constructor(param: T, paramName: string) {
    super(
      HttpStatus.NOT_FOUND,
      `Test block with ${paramName}: '${param.toString()}' not found.`,
    );
  }
}
