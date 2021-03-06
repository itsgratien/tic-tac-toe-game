import { Dispatch } from '@reduxjs/toolkit';
import { apiEndPoints } from '@/utils/ApiEndPoints';
import { action } from '@/utils/ActionSetup';
import * as slice from './GameSlice';
import { checkForWinner } from '@/utils/GameHelper';
import { PlayerEnum } from '@/generated/Game';

export const playAction = (value: string) => async (dispatch: Dispatch) => {
  dispatch(slice.setPlayLoading(true));

  return action({
    method: 'GET',
    url: apiEndPoints.play(value),
    onError: (e) => {
      if (e) {
        dispatch(slice.setPlayLoading(false));
        dispatch(slice.setError(e.data.error || 'Internal server error'));
      }
    },
    onSuccess: (res) => {
      dispatch(slice.setPlayLoading(false));
      dispatch(slice.setPlaySuccess(res.board));
      if (res.winner) {
        dispatch(slice.setWinner(res.winner));
        dispatch(slice.setMessage(`The winner Is Player (${String(res.winner).toUpperCase()})`));
      }

      if (res.tie) {
        dispatch(slice.setWinner(undefined));
        dispatch(slice.setBoard(slice.defaultBoard));
        dispatch(slice.setPlaySuccess(undefined));
        dispatch(slice.setError('Game Is Over'));
      }
    },
  });
};

export const checkWinnerAction =
  (board: string[], player: PlayerEnum) => async (dispatch: Dispatch) => {
    const res = checkForWinner(board);
    if (res && res.winner && res.value && res.value?.length > 0) {
      dispatch(slice.setWinner(res.winner));
      dispatch(slice.setMessage(`The winner Is Player (${String(res.winner).toUpperCase()})`));
      dispatch(slice.setPlaySuccess(undefined));
      dispatch(slice.setWinnerCombination(res.value));
      dispatch(slice.setPlayer(player === PlayerEnum.User ? PlayerEnum.Computer : PlayerEnum.User));
    }
  };
