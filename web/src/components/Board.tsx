import React from 'react';
import classname from 'classnames';
import style from './Style.module.scss';
import { useAppSelector, useAppDispatch } from '@/hooks/Redux';
import { playAction } from '@/redux/GameAction';

export const Board = () => {
  const player = 'x';

  // const computer = 'o';

  const dispatch = useAppDispatch();

  const selector = useAppSelector((state) => ({
    board: state.gameReducer.board,
    playLoading: state.gameReducer.playLoading,
    playSuccess: state.gameReducer.playSuccess,
    tie: state.gameReducer.tie,
    winner: state.gameReducer.winner,
  }));

  const { board } = selector;

  const getValue = (values: string[]) => {
    const get = values.map((item) => {
      if (item.trim() === '') {
        item = '+';
      }
      return item;
    });

    return get.join('');
  };

  const handlePlay = (item: string, index: number) => {
    if (item.trim() !== '') {
      return;
    }
    const newBoard = board.map((b, bIndex) => {
      if (bIndex === index) {
        b = player;
      }
      return b;
    });
    const values = getValue(newBoard);

    dispatch(playAction(values));
  };

  return (
    <div className={classname('relative', style.board)}>
      <div className={classname('relative', style.squares)}>
        <ul className="flex justify-between flex-wrap relative">
          {selector.playLoading && <div className={style.disable}></div>}
          {board.map((item, itemKey) => (
            <li
              key={itemKey}
              className="bg-black flex items-center justify-center"
              style={{ cursor: 'pointer' }}
              onClick={() => handlePlay(item, itemKey)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={style.players}>
        <ul className="flex items-center justify-between">
          <li>
            <span>Player 1 (You)</span>
            <span>X</span>
          </li>
          <li>
            <span>Player 2 (Computer)</span>
            <span>O</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
