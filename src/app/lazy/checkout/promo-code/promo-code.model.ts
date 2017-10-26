export interface PromoCodeError {
  body: string;
  status: string;
}

export interface PromoCodeResponse {
  type: string;
  value: number;
  services: Array<PromoCodeService>;
  code?: string;
}

export interface PromoCodeService {
  id: number;
  link: string;
  name: string;
}

export interface PromoCheckStatus {
  status: boolean;
  message?: string;
}