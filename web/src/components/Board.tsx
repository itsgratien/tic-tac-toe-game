import React from 'react';
import classname from 'classnames';
import style from './Style.module.scss';
import { useAppSelector, useAppDispatch } from '@/hooks/Redux';
import { playAction, checkWinnerAction } from '@/redux/GameAction';
import { PlayerEnum } from '@/generated/Game';
import * as slice from '@/redux/GameSlice';

export const Board = () => {
  const player = 'x';

  const dispatch = useAppDispatch();

  const selector = useAppSelector((state) => ({
    board: state.gameReducer.board,
    playLoading: state.gameReducer.playLoading,
    playSuccess: state.gameReducer.playSuccess,
    winner: state.gameReducer.winner,
    combinations: state.gameReducer.winnerCombinations,
    currentPlayer: state.gameReducer.currentPlayer,
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

  const handleFind = (index: number) => {
    if (selector.combinations && selector.combinations.length > 0) {
      for (let i = 0; i < selector.combinations.length; i++) {
        if (selector.combinations[i] === index) {
          return '#FAFF00';
        }
      }
    }
    return 'black';
  };

  React.useEffect(() => {
    if (selector.playSuccess && !selector.playLoading) {
      dispatch(checkWinnerAction(board, selector.currentPlayer));
    }
  }, [selector.playSuccess, selector.playLoading, dispatch, board, selector.currentPlayer]);

  React.useEffect(() => {
    if (
      selector.currentPlayer === PlayerEnum.Computer &&
      selector.combinations &&
      selector.combinations.length <= 0
    ) {
      dispatch(playAction(getValue(slice.defaultBoard)));
    }
  }, [selector.currentPlayer, selector.combinations, dispatch]);

  return (
    <div className={classname('relative', style.board)}>
      <div className={classname('relative', style.squares)}>
        <ul className="flex justify-between flex-wrap relative">
          {selector.playLoading && <div className={style.disable}></div>}
          {board.map((item, itemKey) => (
            <li
              key={itemKey}
              className="bg-black flex items-center justify-center"
              style={{
                cursor: 'pointer',
                background: handleFind(itemKey),
                color: handleFind(itemKey) === '#FAFF00' ? 'black' : 'white',
              }}
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
