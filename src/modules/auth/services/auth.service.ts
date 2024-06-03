import { Injectable } from '@nestjs/common';

import { IUserData } from '#common/models/interfaces';
import { SignInRequestDto } from '#modules/auth/models/dtos/request';
import { LoginResponseDto, TokenResponseDto } from '#modules/auth/models/dtos/response';
import { JwtPayload } from '#modules/auth/models/interfaces';
import { TokenService } from '#modules/auth/services/token.service';
import { TokenStorageService } from '#modules/auth/services/token-storage.service';
import { UserRepository } from '#modules/repository/services/user.repository';
import { UserMapper } from '#modules/user/services/user.mapper';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private tokenStorageService: TokenStorageService,
  ) {}

  public async login(userData: IUserData, dto: SignInRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOneBy({
      id: userData.userId,
    });

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      deviceId: dto.deviceId,
    };
    const tokens = this.tokenService.generateAuthTokens(payload);
    await this.tokenStorageService.insert(user.id, userData.deviceId, tokens);

    const userDto = UserMapper.toResponseDto(user);
    return {
      user: userDto,
      tokens,
    };
  }

  public async refresh(userData: IUserData): Promise<TokenResponseDto> {
    const tokens = this.tokenService.generateAuthTokens({
      userId: userData.userId,
      email: userData.email,
      role: userData.role,
      deviceId: userData.deviceId,
    });

    await this.tokenStorageService.insert(userData.userId, userData.deviceId, tokens);
    return tokens;
  }

  public async logout(userData: IUserData): Promise<void> {
    await this.tokenStorageService.invalidate(userData.userId, userData.deviceId);
  }
}
