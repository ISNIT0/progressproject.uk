import DOMParser from "dom-parser";
import axios from "axios";
import { decode } from "html-entities";
import { cacheIt } from "./cacheIt";

const MATCH_GOOGLE_REDIRECT_URLS =
  /https:\/\/www\.google\.com\/url\?q(%3D|=)https:\/\/www\.google\.com\/url\?q(%3D|=)/g;
const MATCH_GOOGLE_REDIRECT_URLS_FULL =
  /https:\/\/www\.google\.com\/url\?q(%3D|=)https:\/\/www\.google\.com\/url\?q(%3D|=)(.*?)"/g;

async function _getGoogleDocsContent(
  url: string,
  asHtml = true
): Promise<string> {
  const shouldTrim =
    url.includes("/edit") || url.includes("/view") || url.includes("/preview");
  const htmlUrl = shouldTrim
    ? url.split("/").slice(0, -1).join("/") + "/mobilebasic"
    : url + "/mobilebasic";
  const resp = await axios.get(htmlUrl);
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(resp.data);
  const [document] = Array.from(
    doc.getElementsByClassName("doc") as any
  ) as any[];

  let preparedHtml: string = document.innerHTML;

  // Strip Google Redirect Urls
  const redirectMatches =
    preparedHtml.match(MATCH_GOOGLE_REDIRECT_URLS_FULL) || [];
  for (const match of redirectMatches) {
    const correctUrl = decode(
      decodeURIComponent(match.replace(MATCH_GOOGLE_REDIRECT_URLS, ""))
    ).split("&")[0];

    preparedHtml = preparedHtml.replace(match, correctUrl + '"');
  }

  // Wrap tables in stylable wrappers
  preparedHtml = preparedHtml
    .replaceAll("<table", '<div class="table-wrapper"><table')
    .replaceAll("/table>", "/table></div>");

  // TODO: replace ids on h1,2,3,4,5,6 with slugs

  return asHtml ? preparedHtml : document.textContent;
}

export const getGoogleDocsContent = cacheIt(
  "google-docs",
  process.env.NODE_ENV === "production" ? 1000 * 60 * 60 : 0,
  _getGoogleDocsContent
);
