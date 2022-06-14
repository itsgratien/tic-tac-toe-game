import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameInitialState } from '@/generated/Game';

const initialState: GameInitialState = {
  board: ['', '', '', '', '', '', '', '', ''],
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

    setPlaySuccess: (state, action: PayloadAction<string>) => ({
      ...state,
      playSuccess: action.payload,
      board: action.payload.split(''),
    }),
    setError: (state, action) => ({ ...state, error: action.payload }),

    setMessage: (state, action) => ({ ...state, message: action.payload }),
  },
});

const gameReducer = gameSlice.reducer;

const { setPlayError, setPlayLoading, setPlaySuccess, setError, setMessage } = gameSlice.actions;

export { gameReducer, setPlayError, setPlayLoading, setPlaySuccess, setError, setMessage };
