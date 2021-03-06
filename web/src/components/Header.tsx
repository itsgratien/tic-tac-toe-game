import React from 'react';
import classname from 'classnames';
import style from './Style.module.scss';
import * as slice from '@/redux/GameSlice';
import { useAppDispatch } from '@/hooks/Redux';

export const Header = () => {
  const dispatch = useAppDispatch();

  const handleRestart = () => {
    dispatch(slice.setBoard(slice.defaultBoard));
    dispatch(slice.setPlaySuccess(undefined));
    dispatch(slice.setWinnerCombination([]));
  };

  return (
    <header className={classname('relative w-full', style.header)}>
      <ul className="flex justify-between">
        <li>
          <img src="/logo.svg" alt="logo" />
        </li>
        <li>
          <button
            type="button"
            className={classname('relative bg-yellow text-black font-bold text-14')}
            onClick={handleRestart}
          >
            Restart Game
          </button>
        </li>
      </ul>
    </header>
  );
};
