import { IUserData } from '#common/models/interfaces/user-data.interface';
import { UserEntity } from '#database/entities/user.entity';
import { UserResponseDto } from '#modules/user/models/dtos/response/user.response.dto';

export class UserMapper {
  public static toResponseDto(entity: UserEntity): UserResponseDto {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      status: entity.status,
      role: entity.role,
    };
  }

  public static toUserData(entity: UserEntity, deviceId: string): IUserData {
    return {
      role: entity.role,
      email: entity.email,
      userId: entity.id,
      deviceId,
    };
  }
}
