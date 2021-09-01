import Document, { Html, Head, Main, NextScript } from 'next/document'
import Alerts from '../modules/Toasts'
class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet" />
                </Head>
                <body>
                <Main />
                <NextScript />
                <script src={"/scripts.js"}></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument