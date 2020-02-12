import Head from 'next/head';
import { useEffect } from 'react';

import { setListeners } from '../lib/global';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setListeners();
  }, []);

  return (
    <>
      <Head>
        <title>tessa crespo</title>
        <meta http-equiv="X-UA-Compatible" content="chrome=1" />
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
        <link rel="shortcut icon" type="image/png" href="/favicon.ico" />

        <link href="/global.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:300,400,600,700&display=swap" rel="stylesheet" />

        <script type="text/javascript" src="/page-setup.js"></script>
        <script type="text/javascript" src="https://static.cdn.prismic.io/prismic.min.js?new=true"></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

// MyApp.getInitialProps = async ctx => {
//   const metadata = await Client(ctx.req).getSingle('metadata');
//   console.log({ metadata })
//   return { metadata }
// }

export default MyApp