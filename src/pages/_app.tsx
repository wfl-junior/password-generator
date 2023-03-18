import { MotionConfig } from "framer-motion";
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

    <ToastContainer
      theme="dark"
      autoClose={3000}
      toastClassName="bg-zinc-800"
    />

    <MotionConfig reducedMotion="user">
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 px-4 text-zinc-100">
        <Component {...pageProps} />
      </main>
    </MotionConfig>
  </Fragment>
);

export default App;
