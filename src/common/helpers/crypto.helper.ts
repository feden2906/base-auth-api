import { createHmac } from 'node:crypto';

export class CryptoHelper {
  public static hashPassword(password: string): string {
    return createHmac('sha256', password).digest('hex');
  }
}
