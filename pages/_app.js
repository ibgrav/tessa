import Head from 'next/head';
import theme from '../lib/theme';

import {AppProvider} from '../lib/AppContext';

function MyApp({ Component, pageProps }) {
    const { font, bg } = theme();

    return (
        <>
            <Head>
                <title>tessa crespo</title>
                <meta http-equiv="X-UA-Compatible" content="chrome=1" />
                <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
                <link rel="shortcut icon" type="image/png" href="/favicon.ico" />

                <script type="text/javascript" src="/prismic-endpoint.js"></script>
                <script type="text/javascript" src="https://static.cdn.prismic.io/prismic.min.js?new=true"></script>
                <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:300,400,600,700&display=swap" rel="stylesheet" />

                <style>{`
                    * {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        font-family: 'Josefin Sans', sans-serif;
                    }

                    body {
                        margin: 0 auto;
                        color: ${font.primary};
                        background-color: ${bg.primary};
                        font-size: 16px;
                        
                    }

                    @media screen and (max-width: 600px) {
                        body {
                            font-size: 16px;
                        }
                    }

                    @media screen and (max-width: 420px) {
                        body {
                            font-size: 16px;
                        }
                    }
                `}</style>
            </Head>
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </>
    )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async ctx => {
//     const req = ctx.req;
//     const metadata = await Client(req).getSingle('metadata');
//     console.log({ metadata, ctx })
//     return { metadata: metadata }
// }

export default MyApp