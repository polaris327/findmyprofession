
export interface IPayment {
  sub_total: number;
  promo_code?: IPromoCode;
  total?: number;
}

export interface IPromoCode {
  type: string;
  value: number;
  code: string;
}
