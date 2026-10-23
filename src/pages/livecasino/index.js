import React from "react";
import Head from "next/head";
import LiveCasinoView from "@/components/livecasino";

export default function LiveCasinoPage() {
  return (
    <>
      <Head>
        <title>Golazo | Live Casino</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no"
        />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <LiveCasinoView />
    </>
  );
}
