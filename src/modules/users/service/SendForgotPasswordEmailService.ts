/* eslint-disable @typescript-eslint/no-unused-vars */
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { Err } from '@shared/errors/AppError';
import path from 'path';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
export class SendForgotPasswordEmailService {
  constructor(
    @inject(process.env.USER!)
    private userRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('token')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Err('Usuario nao existe');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const forgotPassword = path.resolve(
      __dirname,
      '..',
      'view',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[DaisyNails] Recuperaçao de senha',
      templateData: {
        file: forgotPassword,
        variables: {
          name: user.name,
          token,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}
