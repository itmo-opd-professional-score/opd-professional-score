import { Inject, Injectable } from '@nestjs/common';
import { BasicTestCreationDto } from '../dto/test/basic-test-creation.dto';
import { UserProvider } from '../providers/user.provider';

@Injectable()
export class AgeBalancerUtil {
  constructor(@Inject(UserProvider) private userProvider: UserProvider) {}

  public async balance<T extends BasicTestCreationDto>(data: T) {
    let userAge: number = 0;

    if (data.userId != null) {
      const user = await this.userProvider.getUserById(data.userId);
      if (user != null) {
        userAge = user.age == null ? 30 : userAge;
      }
    } else {
      userAge = 30;
    }

    if (userAge < 15) {
      return 1.2;
    } else if (userAge < 20) {
      return 1.1;
    } else if (userAge < 30) {
      return 1;
    } else if (userAge < 40) {
      return 0.95;
    } else if (userAge < 50) {
      return 0.9;
    } else if (userAge < 60) {
      return 0.8;
    } else if (userAge < 70) {
      return 0.6;
    } else if (userAge < 80) {
      return 0.5;
    } else return 0.4;
  }
}
