import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/redux/index';
import { ToastMessage } from '@/components/ToastMessage';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta title="og:author" content="Gratien Tuyishimire" />
        <meta name="description" content="Created By Gratien" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Provider store={store}>
        <ToastMessage />
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default MyApp;
