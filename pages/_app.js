import { BasketProvider } from '../context/BasketContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <BasketProvider>
      <Component {...pageProps} />
    </BasketProvider>
  );
}

export default MyApp; 