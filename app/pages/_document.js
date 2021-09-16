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
                    <meta name="google-signin-client_id" content="118543512855-tgs4pikh9udu9fodu1i4jgo3fcj757mi.apps.googleusercontent.com" />
                </Head>
                <body>
                <Main />
                <NextScript />
                <script async
                        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBSLBdByD8uF_FyaRvINZ1xcP37ci6I3pQ&libraries=places">
                </script>
                <script src={"/scripts.js"}></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument