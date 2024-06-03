import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TableNameEnum } from '#entities/enums';
import { BaseEntity } from '#entities/models';
import { UserID } from '#entities/types';
import { UserRoleEnum, UserStatusEnum } from '#modules/user/models/enums';

@Entity(TableNameEnum.USERS)
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UserID;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('enum', { enum: UserStatusEnum })
  status: UserStatusEnum;

  @Column('text', { select: false })
  password: string;

  @Column('enum', { enum: UserRoleEnum })
  role: UserRoleEnum;
}
