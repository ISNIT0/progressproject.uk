import Head from "next/head";
import styles from "@/styles/Article.module.scss";
import { articles, Article } from "../articles";
import { getGoogleDocsContent } from "@/utils/getGoogleDocsContent";
import cx from "classnames";
import { ArticleAside } from "../components/ArticleAside";

export default function Page({
  article,
  articleHtml,
}: {
  article: Article;
  articleHtml: string;
}) {
  return (
    <>
      <Head>
        <title>{`Progress Project`}</title>
        <meta name="description" content="It's time." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <ArticleAside article={article} />
      <article
        dangerouslySetInnerHTML={{ __html: articleHtml }}
        className={cx(styles.article, styles.genericDocWrapper)}
      ></article>
      <ArticleAside article={article} />
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const parts = context?.params?.parts;
  let slug = "";
  if (parts) {
    slug = parts[0];
  }

  const article = articles.find((article) => article.slug === slug);

  if (!article) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const articleHtml = await getGoogleDocsContent(article.docUrl);

  return {
    props: {
      article,
      articleHtml,
    },
  };
};
