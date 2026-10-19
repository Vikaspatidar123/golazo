import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Golazo.club - O melhor site de apostas do Brasil</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="Golazo.club - Apostas Esportivas, Jogos Ao Vivo, Melhores Cotações" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
