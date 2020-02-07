import Head from 'next/head';
import theme from '../components/theme';

function MyApp({ Component, pageProps }) {
    const { font, bg } = theme();

    return (
        <>
            <Head>
                <title>tessa crespo</title>
                <meta http-equiv="X-UA-Compatible" content="chrome=1" />
                <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
                <link rel="shortcut icon" type="image/png" href="/favicon.ico" />

                <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:300,400,600,700&display=swap" rel="stylesheet" />
                
                <style>{`
                    * {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        font-family: 'Josefin Sans', sans-serif;
                    }

                    body {
                        margin: 0 auto;
                        color: ${font.dark};
                        background-color: ${bg.light};
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
            <Component {...pageProps} />
        </>
    )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp