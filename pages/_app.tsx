import "@/styles/globals.scss";
import styles from "@/styles/Article.module.scss";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>
        <div className={styles.navContent}>
          <br />
          <br />
          <h1>The Progress Project</h1>
          <p>The future is broken. It&apos;s your time to fix it.</p>
        </div>
      </header>

      <main className={styles.main}>
        <Component {...pageProps} />
      </main>

      <footer>
        <div className={styles.footerContent}>
          {/* <h2>About The Progress Project</h2> */}
          <p>
            The Progress Project, incubated by{" "}
            <a href="https://futurehouse.uk">FutureHouse</a>, is run by Dr Lawrence
            Newport and Joe Reeve......
          </p>

          <aside>
            <p>
              👉 Join the{" "}
              <a
                href="https://chat.whatsapp.com/LO8A5WQUTQvBlptXYgGpV5"
                target="_blank"
              >
                Progress Project WhatsApp Group
              </a>{" "}
              to talk to other people who have read this.
            </p>
          </aside>
          <br />
        </div>
      </footer>
    </>
  );
}
