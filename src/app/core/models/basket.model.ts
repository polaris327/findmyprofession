export interface IBasketItem {
  readonly id?: number;
  quantity?: number;
  title?: string;
  price?: number;
  plan?: string;
  icon?: string;
}

export interface IBasket {
  items: Array<IBasketItem>;
  sub_total: number;
  promo_code: IPromoCode;
  total: number;
}
export interface IPromoCode {
  percent: number;
  code: string;
}