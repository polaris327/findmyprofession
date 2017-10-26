export interface ICustomRange {
  step: number;
  minValue: number;
  maxValue: number;
  startValue: number;
  fee: number;
  progressWidth?: number;
  price?: number;
  currentValue?: number | null;
  minRevenue: number;
}
