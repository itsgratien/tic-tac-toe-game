import React from 'react';
import classname from 'classnames';
import style from './Style.module.scss';

export const Header = () => {
  return (
    <header className={classname('relative w-full', style.header)}>
      <ul className="flex justify-between">
        <li>
          <img src="/logo.svg" alt="logo" />
        </li>
        <li>
          <button type="button" className={classname('bg-yellow text-black font-bold text-14')}>
            Restart Game
          </button>
        </li>
      </ul>
    </header>
  );
};
