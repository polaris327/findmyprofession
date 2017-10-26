import {IUser} from '../../core/models/user.model';

export interface IPaymentRequest {
  payer_credentials: ICredentials;
  payment_info: IPaymentInfo;
  payer_basket: Array<IPaymentItem>;
  discount: PaymentDiscount;
}

export interface PaymentDiscount {
  code: string | null;
}

export interface ICredentials {
  full_name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

export interface IPaymentInfo {
  description?: string;
  amount: number;
  currency?: string; /*Default is 'usd'*/
  source?: string;
}
export interface IPaymentItem {
  title: string;
  price: number;
  plan?: string;
  id: number;
}
export interface IPaymentResponse {
  user: IUser;
  status: string;
}