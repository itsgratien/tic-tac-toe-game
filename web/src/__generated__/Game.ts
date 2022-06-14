export interface GameInitialState {
  readonly board: string[];
  readonly winner?: string;
  readonly playLoading?: boolean;
  readonly playError?: any;
  readonly playSuccess?: string;
  readonly error?: string;
  readonly message?: string;
  readonly winnerCombinations?: number[];
  readonly currentPlayer: PlayerEnum;
  readonly computerStart?: boolean;
}

export enum PlayerEnum {
  User = 'x',
  Computer = 'o',
}
