import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/redux/index';
import { ToastMessage } from '@/components/ToastMessage';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ToastMessage />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
