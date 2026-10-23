import React from "react";
import Head from "next/head";
import CrazzyWinView from "@/components/crazzy_win";

export default function CrazzyWinPage() {
  return (
    <>
      <Head>
        <title>Golazo | CrazZy Win!</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no"
        />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <CrazzyWinView />
    </>
  );
}
