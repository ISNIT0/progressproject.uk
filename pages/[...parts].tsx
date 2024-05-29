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
        <title>The Progress Project</title>
        <meta name="title" content="The Progress Project" />
        <meta
          name="description"
          content="Britain is in crisis. We deserve better. Join us today."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.progressproject.uk/" />
        <meta property="og:title" content="The Progress Project" />
        <meta
          property="og:description"
          content="Britain is in crisis. We deserve better. Join us today."
        />
        <meta
          property="og:image"
          content="/banner.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.progressproject.uk/"
        />
        <meta property="twitter:title" content="The Progress Project" />
        <meta
          property="twitter:description"
          content="Britain is in crisis. We deserve better. Join us today."
        />
        <meta
          property="twitter:image"
          content="/banner.png"
        />
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
