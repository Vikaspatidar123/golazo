// export function getServerSideProps() {
//   return {
//     redirect: {
//       destination: "/login",
//       permanent: false,
//     },
//   };
// }

import React from "react";
import Head from "next/head";
import LoginView from "@/components/login";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Ingreso - Golazo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <LoginView />
    </>
  );
}
