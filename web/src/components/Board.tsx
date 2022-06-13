import React from 'react';
import classname from 'classnames';
import style from './Style.module.scss';

export const Board = () => {
  const board = ['', '', '', '', '', '', '', '', ''];
  return (
    <div className={classname('relative', style.board)}>
      <div className={classname('relative', style.squares)}>
        <ul className="flex justify-between flex-wrap">
          {board.map((item, itemKey) => (
            <li key={itemKey} className="bg-black" style={{ cursor: 'pointer' }}>
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
