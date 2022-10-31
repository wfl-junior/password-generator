import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Fragment>
    <Head>
      <title>Strong password generator</title>
    </Head>

    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 px-4 text-zinc-100">
      <ToastContainer theme="dark" toastClassName="bg-zinc-800" />
      <Component {...pageProps} />
    </main>
  </Fragment>
);

export default App;
