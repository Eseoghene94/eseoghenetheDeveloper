import '@/styles/globals.css';
import Head from 'next/head';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/footer';
import PageTransition from '@/Components/PageTransition';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-dark focus:px-4 focus:py-2 focus:text-light"
      >
        Skip to content
      </a>
      <div className="font-mont bg-light w-full min-h-screen">
        <Navbar />
        <div id="content">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
      <PageTransition />
    </>
  );
}
