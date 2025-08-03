import * as makeUrl from "../utils/makeUrl.js";
import getData from "../utils/getData.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);

  let symbol;
  for (const [key, value] of urlParams.entries()) {
    if (key === "symbol") {
      symbol = value;
    }
  }
  if (!symbol) throw new Error("no symbol");

  document.title = `${symbol} Company Page`;

  const url = makeUrl.companyUrl(symbol);
  console.log(url);

  getData(url).then((data) => {
    render(data);
  });
});

const render = (data) => {
  console.log(data);
};
