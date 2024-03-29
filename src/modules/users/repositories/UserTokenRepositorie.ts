import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import { User_tokens, PrismaClient } from '@prisma/client';

export default class UserTokenRepository implements IUserTokenRepository {
  private prisma = new PrismaClient();

  public async findByToken(token: string): Promise<User_tokens | null> {
    const userToken = await this.prisma.user_tokens.findUnique({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<User_tokens> {
    const userToken = await this.prisma.user_tokens.create({
      data: {
        user_id,
      },
    });

    return userToken;
  }
}
