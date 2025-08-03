import * as update from "./update.js";
import * as makeUrl from "./makeUrl.js";

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const searchContainer = document.getElementById("search-container");

  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const loading = document.getElementById("loading");

  startButton.addEventListener("click", () => {
    update.init();
    startButton.style.display = "none";
    searchContainer.style.display = "initial";
  });

  searchButton.addEventListener("click", () => {
    loading.style.display = "initial";

    const query = searchInput.value;
    const url = makeUrl.searchURL(query);

    update
      .search(url)
      .then((model) => render(model))
      .catch((error) => {
        console.error(error);
        loading.style.display = "none";
      });

    searchInput.value = "";
  });
});

function createStock(stock) {
  const stockContainer = document.createElement("div");
  stockContainer.setAttribute("class", "stock-container");

  const a = document.createElement("a");
  a.setAttribute("class", "stock");
  a.innerHTML = `${stock.name} (${stock.symbol})`;
  a.setAttribute("id", stock.symbol);
  a.setAttribute("href", `/company.html?symbol=${stock.symbol}`);
  a.setAttribute("target", "_blank");

  stockContainer.appendChild(a);
  return stockContainer;
}

const render = (model) => {
  loading.style.display = "none";
  const searchResults = document.getElementById("search-results");
  searchResults.innerHTML = "";
  const stocks = model.stocks;
  stocks.forEach((stock) => {
    searchResults.appendChild(createStock(stock));
  });
};
