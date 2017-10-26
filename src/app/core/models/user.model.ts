export interface IUser {
  readonly id?: number;
  token: string;
  full_name: string;
  email: string;
  readonly username?: string;
  packages: Array<IUserPackage>;

  phone_number: string;
}

export interface IUserPackage {
  id: number;
  plan: string;
  price: number;
  service: UserPackageService;
}

export interface UserPackageService {
  readonly icon: string;
  readonly id: number;
  readonly link: string;
  readonly name: string;
  readonly price_executive: number | null;
  readonly price_senior: number;
}
