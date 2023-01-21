import { PropsCard } from '@shared/dtos';

export interface IPaymentRepositories {
  pay_card(card: PropsCard): Promise<PropsCard>;
  // pay_pix(pix: IPropsPix)
  sessionPag(appId: string, appKye: string): Promise<void>;
}
