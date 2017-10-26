export interface ICareerFinderPackage {
  description: string;
  icon: string;
  id: number;
  link: string;
  name: string;
  price_executive: number;
  price_senior: number;
}
export interface ISelectItem {
  id: number;
  title: string;
  icon: string;
  isSelected: boolean;
  selectedType: ISelctedItem;
  types: Array<ISelctedItem>;
}
export interface ISelctedItem {
  title: string;
  price: number;
}