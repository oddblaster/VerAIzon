import "@/styles/globals.css";
import { Space_Grotesk } from "next/font/google";
import type { AppProps } from "next/app";

const font = Space_Grotesk({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={font.className}>
      <Component {...pageProps} />
    </main>
  );
}
