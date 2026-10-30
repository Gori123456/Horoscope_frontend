import '../styles/globals.css';
import Head from 'next/head';
import { ThemeProvider } from '@/context/ThemeContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Head>
        <title>AstroLogic | Deterministic Vedic Horoscope & Predictive Engine</title>
        <meta name="description" content="100% mathematically exact astronomical calculations and canonical Vedic astrological predictive engine." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
