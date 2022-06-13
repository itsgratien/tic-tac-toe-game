import type { NextPage } from 'next';
import Head from 'next/head';
import style from '../styles/Home.module.scss';
import classname from 'classnames';
import { Header } from '@/components/Header';
import { Board } from '@/components/Board';

const Home: NextPage = () => {
  return (
    <div className={classname('relative bg-fblue w-full', style.home)}>
      <Head>
        <title>Tic Tac Toe Game</title>
        <meta title="og:author" content="Gratien Tuyishimire" />
        <meta name="description" content="Created By Gratien" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header />
      <main>
        <Board />
      </main>
    </div>
  );
};

export default Home;
