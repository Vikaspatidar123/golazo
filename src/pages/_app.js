import "@/styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const handleExtensionError = (event) => {
      const errorMsg = event?.message || event?.error?.message || "";
      const filename = event?.filename || "";
      const stack = event?.error?.stack || "";

      if (
        filename.includes("chrome-extension://") ||
        stack.includes("chrome-extension://") ||
        errorMsg.includes("M_ID") ||
        filename.includes("eppiocemhmnlbhjplcgkofciiegomcon")
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return true;
      }
    };

    const handleUnhandledRejection = (event) => {
      const reasonMsg = event?.reason?.message || "";
      const stack = event?.reason?.stack || "";

      if (
        stack.includes("chrome-extension://") ||
        reasonMsg.includes("M_ID") ||
        stack.includes("eppiocemhmnlbhjplcgkofciiegomcon")
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener("error", handleExtensionError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleExtensionError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

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
