import { UserID } from '#entities/types';
import { UserRoleEnum } from '#modules/user/models/enums';

export interface JwtPayload {
  role: UserRoleEnum;
  userId: UserID;
  email: string;
  deviceId: string;
}
