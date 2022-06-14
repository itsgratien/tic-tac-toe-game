import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameInitialState } from '@/generated/Game';

const defaultBoard = ['', '', '', '', '', '', '', '', ''];

const initialState: GameInitialState = {
  board: defaultBoard,
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

    setTie: (state, action: PayloadAction<boolean>) => ({ ...state, tie: action.payload }),

    setWinnerCombination: (state, action: PayloadAction<number[]>) => ({
      ...state,
      winnerCombinations: action.payload,
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
  setTie,
  setWinnerCombination
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
  setTie,
  defaultBoard,
  setWinnerCombination
};
