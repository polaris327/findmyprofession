export interface IPackageSelectEvent {
  fmpPlan: IPackageSelectItem;
  isSelected: boolean;
}
export interface IPackageSelectItem {
  readonly id: number | string;
  title: string;
  icon?: string;
  types: Array<IPackageSelectType>;
  selectedType: IPackageSelectType;
}
export interface IPackageSelectType {
  id?: string | number;
  title?: string;
  price?: number;
}