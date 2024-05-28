import { Article } from "../articles";

export const ArticleAside = ({ article }: { article: Article }) => {
  if (article.cta || article.whatsAppUrl) {
    return (
      <aside>
        {article.cta ? (
          <p>
            👉 {" "}
            <a href={article.cta.url} target="_blank" className="cta">
              {article.cta.text}
            </a>
          </p>
        ) : null}
        {article.whatsAppUrl ? (
          <p>
            💬{" "}
            <a href={article.whatsAppUrl} target="_blank">
              Join the WhatsApp group for this article
            </a>
          </p>
        ) : null}
      </aside>
    );
  } else {
    return null;
  }
};
