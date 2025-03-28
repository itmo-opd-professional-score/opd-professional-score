import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserNotFoundException } from '../exceptions/users/user-not-found.exception';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { DoubleRecordException } from '../exceptions/common/double-record.exception';
import { BcryptUtil } from '../utils/bcrypt.util';
import { RolesEnum } from '../config/enums/roles.enum';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { SetUserRoleDto } from '../dto/user/set-user-role.dto';
import { InvalidEnumSyntaxException } from '../exceptions/validation/invalid-enum-syntax.exception';
import { SuccessAuthResponseDto } from '../dto/auth/success-auth-response.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePassFirstStepDto } from '../dto/user/change-pass-first-step.dto';
import { AuthCodesStrategy } from '../strategies/auth-codes.strategy';
import { MailerProvider } from './mailer.provider';
import { MailInfoDto } from '../dto/mailer/mail-info.dto';
import { ChangePassSecondStepDto } from '../dto/user/change-pass-second-step.dto';
import { IncorrectVerificationCodeException } from '../exceptions/auth/incorrect-verification-code.exception';
import { GenderEnum } from '../config/enums/gender.enum';

@Injectable()
export class UserProvider {
  constructor(
    @Inject(BcryptUtil) private bcryptUtil: BcryptUtil,
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(AuthCodesStrategy) private authCodesStrategy: AuthCodesStrategy,
    @Inject(MailerProvider) private mailerProvider: MailerProvider,
  ) {}

  public async getAllUsers(): Promise<User[]> {
    return User.findAll();
  }

  public async getUserById(id: number): Promise<User | null> {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (user == null) throw new UserNotFoundException(id, 'id');

    return user;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user == null) throw new UserNotFoundException(email, 'email');

    return user;
  }

  public async getUsersByRole(
    role: RolesEnum,
  ): Promise<BasicSuccessfulResponse<User[]> | null> {
    if (!Object.values(RolesEnum).includes(role))
      throw new InvalidEnumSyntaxException('Roles', role);

    const users = await User.findAll({
      where: { role: role },
    });
    return new BasicSuccessfulResponse(users);
  }

  public async createUser(
    data: CreateUserDto,
  ): Promise<BasicSuccessfulResponse<SuccessAuthResponseDto>> {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (user != null)
      throw new DoubleRecordException(
        `User with email '${data.email}' already exists.`,
      );

    if (data.gender != null && !Object.values(GenderEnum).includes(data.gender))
      throw new InvalidEnumSyntaxException('GenderEnum', data.gender);

    const newUser = await User.create({
      username: data.username,
      email: data.email,
      role: data.role == null ? RolesEnum.USER : data.role,
      age: data.age == null ? null : data.age,
      gender: data.gender == null ? null : data.gender,
      password: await this.bcryptUtil.hashPassword(data.password),
      isBanned: data.isBanned == null ? false : data.isBanned,
    });

    const response: SuccessAuthResponseDto = {
      token: this.jwtService.sign({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        isBanned: newUser.isBanned,
      }),
      role: newUser.role,
    };

    return new BasicSuccessfulResponse<SuccessAuthResponseDto>(response);
  }

  public async updateUser(
    data: UpdateUserDto,
  ): Promise<BasicSuccessfulResponse<User> | null> {
    await this.getUserById(data.id);
    const updatedData: Partial<User> = data.updatedData;

    if (
      data.updatedData.gender != null &&
      !Object.values(GenderEnum).includes(data.updatedData.gender)
    )
      throw new InvalidEnumSyntaxException(
        'GenderEnum',
        data.updatedData.gender,
      );

    if (updatedData.email != null) {
      const user = await User.findOne({
        where: { email: updatedData.email },
      });

      if (user != null) {
        throw new DoubleRecordException(
          `User with email '${updatedData.email}' already exists.`,
        );
      }
    }

    await User.update({ ...updatedData }, { where: { id: data.id } });

    const response = {
      message: 'User successfully updated',
      user: await this.getUserById(data.id),
    };
    return new BasicSuccessfulResponse(response);
  }

  public async deleteUser(
    id: number,
  ): Promise<BasicSuccessfulResponse<string>> {
    await this.getUserById(id);
    await User.destroy({
      where: { id: id },
    });

    return new BasicSuccessfulResponse('User deleted successfully');
  }

  public async banUser(id: number): Promise<BasicSuccessfulResponse<string>> {
    await this.getUserById(id);
    await User.update({ isBanned: true }, { where: { id: id } });

    return new BasicSuccessfulResponse('User banned successfully');
  }

  public async unbanUser(id: number): Promise<BasicSuccessfulResponse<string>> {
    await this.getUserById(id);
    await User.update({ isBanned: false }, { where: { id: id } });

    return new BasicSuccessfulResponse('User unbanned successfully');
  }

  public async setUserRole(
    data: SetUserRoleDto,
  ): Promise<BasicSuccessfulResponse<string>> {
    await this.getUserById(data.id);
    if (!Object.values(RolesEnum).includes(data.role))
      throw new InvalidEnumSyntaxException('Roles', data.role);

    await User.update({ role: data.role }, { where: { id: data.id } });

    return new BasicSuccessfulResponse(`User's role updated successfully`);
  }

  public async changePasswordFirstStep(
    data: ChangePassFirstStepDto,
  ): Promise<BasicSuccessfulResponse<string>> {
    const user = await this.getUserByEmail(data.email);
    const code = await this.authCodesStrategy.applyPassCode(data.email);

    const mail: MailInfoDto = {
      email: data.email,
      username: (user as User).username,
      code: code.code,
    };
    await this.mailerProvider.sendPassVerificationMail(mail);
    return new BasicSuccessfulResponse(
      'Email with verification code sent successfully.',
    );
  }

  public async changePasswordSecondStep(
    data: ChangePassSecondStepDto,
  ): Promise<BasicSuccessfulResponse<string>> {
    const user = await this.getUserByEmail(data.email);

    if (await this.authCodesStrategy.verifyCode(data.code, data.email)) {
      await User.update(
        { password: await this.bcryptUtil.hashPassword(data.password) },
        { where: { id: user?.id } },
      );
      return new BasicSuccessfulResponse('Password changed successfully');
    } else throw new IncorrectVerificationCodeException();
  }
}
