const stripHtml = (text = "") => {
  return text.replace(/<[^>]*>/g, " ");
};

const decodeHtmlEntities = (text = "") => {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#43;/gi, "+");
};

const normalizeWhitespace = (text = "") => {
  return text
    .replace(/\r/g, " ")
    .replace(/\n/g, " ")
    .replace(/\t/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .trim();
};

const cleanText = (text = "") => {
  return normalizeWhitespace(
    decodeHtmlEntities(
      stripHtml(text)
    )
  );
};

export {
  stripHtml,
  decodeHtmlEntities,
  normalizeWhitespace,
  cleanText,
};