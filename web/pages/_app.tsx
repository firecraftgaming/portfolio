import "../styles/global.css";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Eliyah Sundström</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;