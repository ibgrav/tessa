import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta http-equiv="X-UA-Compatible" content="chrome=1" />
                    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
                    <link rel="shortcut icon" type="image/png" href="/favicon.ico"/>

                    <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:300,400,600,700&display=swap" rel="stylesheet" />
                    <link rel="stylesheet" type="text/css" href="global.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument