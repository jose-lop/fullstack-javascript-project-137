const decodeHtml = (text) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

const parseRSS = (data) => {
  const parser = new DOMParser();

  const doc = parser.parseFromString(data, "application/xml");

  const title = doc.querySelector("channel > title")?.textContent ?? "";

  const description =
    doc.querySelector("channel > description")?.textContent ?? "";

  const items = doc.querySelectorAll("item");

  if (!title || items.length === 0) {
    throw new Error("invalidRss");
  }

  const posts = Array.from(items).map((item) => ({
    title: decodeHtml(item.querySelector("title")?.textContent ?? ""),
    description: decodeHtml(
      item.querySelector("description")?.textContent ?? "",
    ),
    link: item.querySelector("link")?.textContent ?? "",
  }));

  return {
    title,
    description,
    posts,
  };
};

export default parseRSS;
