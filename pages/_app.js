import Head from 'next/head';
import { useEffect, useState } from 'react';
import { setListeners, absoluteUrl } from '../lib/global';

function MyApp({ Component, pageProps }) {
  const [isStage, setIsStage] = useState(false);

  useEffect(() => {
    const prefix = location.host.split('.')[0];
    console.log({ prefix })
    if (prefix === 'localhost:3000' || prefix === 'stage-tessa') {
      setIsStage(true);
      console.log('IS STAGING ENV');
    }

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
        {isStage && <script type="text/javascript" src="https://static.cdn.prismic.io/prismic.min.js?new=true"></script>}
      </Head>
      <Component {...pageProps} />
    </>
  )
}

// MyApp.getInitialProps = async ctx => {
//   return { req: ctx.req }
// }

export default MyApp