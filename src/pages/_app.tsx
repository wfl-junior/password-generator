import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <div className="min-h-screen flex items-center justify-center bg-zinc-900">
    <Component {...pageProps} />
  </div>
);

export default App;
