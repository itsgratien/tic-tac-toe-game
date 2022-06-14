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
      dispatch(slice.setPlayLoading(false));
      dispatch(slice.setError(e.data.error || 'Internal server error'));
    },
    onSuccess: (res) => {
      dispatch(slice.setPlayLoading(false));
      dispatch(slice.setPlaySuccess(res.data.board));

      if (res.data.winner) {
        dispatch(
          slice.setMessage(`The winner is ${res.data.winner === 'x' ? 'Player X' : 'Computer'}`)
        );
      }
    },
  });
};
