import { Dispatch } from '@reduxjs/toolkit';
import { apiEndPoints } from '@/utils/ApiEndPoints';
import { action } from '@/utils/ActionSetup';
import * as slice from './GameSlice';

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
      }

      if (res.tie) {
        dispatch(slice.setTie(res.tie));
        dispatch(slice.setWinner(undefined));
        dispatch(slice.setBoard(slice.defaultBoard));
        dispatch(slice.setPlaySuccess(undefined));
      }
    },
  });
};
