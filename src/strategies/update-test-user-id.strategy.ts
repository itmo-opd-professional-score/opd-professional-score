import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserIdsDto } from '../dto/test/update-user-ids.dto';
import { UserProvider } from '../providers/user.provider';
import { JwtTestsFeedbackGeneratorUtil } from '../utils/jwt-tests-feedback-generator.util';
import { SimpleLightTestProvider } from '../providers/tests-providers/simple-light-test.provider';
import { SimpleSoundTestProvider } from '../providers/tests-providers/simple-sound-test.provider';
import { HardLightTestProvider } from '../providers/tests-providers/hard-light-test.provider';
import { AdditionTestProvider } from '../providers/tests-providers/addition-test.provider';
import { SimpleLightTestEntity } from '../entities/simple-light-test.entity';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { HardLightTestEntity } from '../entities/hard-light-test.entity';
import { SimpleSoundTestEntity } from '../entities/simple-sound-test.entity';
import { AdditionTestEntity } from '../entities/addition-test.entity';

@Injectable()
export class UpdateTestUserIdStrategy {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(JwtTestsFeedbackGeneratorUtil)
    private jwtTestsFeedbackGeneratorUtil: JwtTestsFeedbackGeneratorUtil,
    @Inject(SimpleLightTestProvider)
    private sltProvider: SimpleLightTestProvider,
    @Inject(HardLightTestProvider) private hltProvider: HardLightTestProvider,
    @Inject(SimpleSoundTestProvider)
    private sstProvider: SimpleSoundTestProvider,
    @Inject(AdditionTestProvider) private atProvider: AdditionTestProvider,
  ) {}

  public async updateUserIDs(data: UpdateUserIdsDto) {
    await this.userProvider.getUserById(data.userId);

    await Promise.any(
      data.tokens.map(async (token: string) => {
        const testId =
          this.jwtTestsFeedbackGeneratorUtil.decodeToken(token).testId;
        const testType =
          this.jwtTestsFeedbackGeneratorUtil.decodeToken(token).testType;

        switch (testType) {
          case 'SIMPLE_LIGHT':
            await this.updateSLT(data.userId, testId);
            break;
          case 'HARD_LIGHT':
            await this.updateHLT(data.userId, testId);
            break;
          case 'SIMPLE_SOUND':
            await this.updateSST(data.userId, testId);
            break;
          case 'SOUND_ADDITION':
            await this.updateAT(data.userId, testId);
            break;
          case 'ADDITION_SOUND':
            await this.updateAT(data.userId, testId);
            break;
        }
      }),
    );

    return new BasicSuccessfulResponse<string>(
      'Tests userId updated successfully.',
    );
  }

  private async updateSLT(userId: number, testId: number) {
    await this.sltProvider.getById(testId);
    await SimpleLightTestEntity.update(
      { userId: userId },
      { where: { id: testId } },
    );
  }

  private async updateHLT(userId: number, testId: number) {
    await this.hltProvider.getById(testId);
    await HardLightTestEntity.update(
      { userId: userId },
      { where: { id: testId } },
    );
  }

  private async updateSST(userId: number, testId: number) {
    await this.sstProvider.getById(testId);
    await SimpleSoundTestEntity.update(
      { userId: userId },
      { where: { id: testId } },
    );
  }

  private async updateAT(userId: number, testId: number) {
    await this.atProvider.getById(testId);
    await AdditionTestEntity.update(
      { userId: userId },
      { where: { id: testId } },
    );
  }
}
