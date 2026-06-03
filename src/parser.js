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
    title: item.querySelector("title")?.textContent ?? "",
    link: item.querySelector("link")?.textContent ?? "",
  }));

  return {
    title,
    description,
    posts,
  };
};

export default parseRSS;
