import React from 'react';
import { setError, setMessage } from '@/redux/GameSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/Redux';
import toast, { Toaster } from 'react-hot-toast';

export const ToastMessage = () => {
  const dispatch = useAppDispatch();

  const selector = useAppSelector((state) => ({
    error: state.gameReducer.error,
    message: state.gameReducer.message,
  }));

  React.useEffect(() => {
    if (selector.error) {
      toast.error(selector.error);
      setTimeout(() => {
        dispatch(setError(undefined));
      }, 1000);
    }
  }, [selector.error, dispatch]);

  React.useEffect(() => {
    if (selector.message) {
      toast.success(selector.message);
      setTimeout(() => {
        dispatch(setMessage(undefined));
      }, 1000);
    }
  }, [dispatch, selector.message]);

  return (
    <>
      <Toaster
        toastOptions={{
          style: { fontSize: '14px', padding: '15px' },
          success: { style: { background: '#FAFF00' } },
          error: { style: { background: '#ff0f0f', color: 'white' } },
        }}
      />
    </>
  );
};
