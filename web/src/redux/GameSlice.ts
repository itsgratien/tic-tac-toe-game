import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameInitialState, PlayerEnum } from '@/generated/Game';

const defaultBoard = ['', '', '', '', '', '', '', '', ''];

const initialState: GameInitialState = {
  board: defaultBoard,
  currentPlayer: PlayerEnum.User,
};

const gameSlice = createSlice({
  name: 'GameSlice',
  initialState,
  reducers: {
    setPlayLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      playLoading: action.payload,
    }),
    setPlayError: (state, action: PayloadAction<any>) => ({ ...state, playError: action.payload }),

    setPlaySuccess: (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      playSuccess: action.payload,
      board: action.payload ? action.payload.split('') : state.board,
    }),
    setError: (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      error: action.payload,
    }),

    setMessage: (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      message: action.payload,
    }),

    setBoard: (state, action: PayloadAction<string[]>) => ({ ...state, board: action.payload }),

    setWinner: (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      winner: action.payload,
    }),

    setWinnerCombination: (state, action: PayloadAction<number[]>) => ({
      ...state,
      winnerCombinations: action.payload,
    }),

    setPlayer: (state, action: PayloadAction<PlayerEnum>) => ({
      ...state,
      currentPlayer: action.payload,
    }),

    setComputerStart: (state, action: PayloadAction<boolean>) => ({
      ...state,
      computerStart: action.payload,
    }),
  },
});

const gameReducer = gameSlice.reducer;

const {
  setPlayError,
  setPlayLoading,
  setPlaySuccess,
  setError,
  setMessage,
  setBoard,
  setWinner,
  setWinnerCombination,
  setPlayer,
  setComputerStart,
} = gameSlice.actions;

export {
  gameReducer,
  setPlayError,
  setPlayLoading,
  setPlaySuccess,
  setError,
  setMessage,
  setBoard,
  setWinner,
  defaultBoard,
  setWinnerCombination,
  setPlayer,
  setComputerStart,
};
