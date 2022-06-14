export interface GameInitialState {
  readonly board: string[];
  readonly winner?: string;
  readonly tie?: boolean;
  readonly playLoading?: boolean;
  readonly playError?: any;
  readonly playSuccess?: string;
  readonly error?: string;
  readonly message?: string;
  readonly winnerCombinations?: number[];
}

export interface ActiveItemT {
  index: number;
  item: string;
}
