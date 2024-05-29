import "@/styles/globals.scss";
import styles from "@/styles/Article.module.scss";
import type { AppProps } from "next/app";
import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>
        <div className={styles.navContent}>
          <br />
          <br />
          <Image
            src="/icon-transparent.png"
            alt="The Progress Project"
            width={100}
            height={100}
          />
          <br />
          <br />
          <br />
          <br />
          <h1>The Progress Project</h1>
          <p>Britain is in crisis. We deserve better.</p>
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
            <a href="https://futurehouse.uk" target="_blank">
              FutureHouse
            </a>
            , is run by{" "}
            <a href="https://x.com/pursuitofprog" target="_blank">
              Dr Lawrence Newport
            </a>{" "}
            and{" "}
            <a href="https://x.com/isnit0" target="_blank">
              Joe Reeve
            </a>
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
