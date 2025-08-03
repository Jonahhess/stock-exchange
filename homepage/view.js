import * as makeUrl from "../utils/makeUrl.js";
import * as apiStorage from "../utils/apiStorage.js";

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const searchContainer = document.getElementById("search-container");

  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  startButton.addEventListener("click", async () => {
    startButton.style.display = "none";
    searchContainer.style.display = "initial";

    const marqueeLoading = document.getElementById("marquee-loading");
    marqueeLoading.style.display = "initial";
    const listUrl = makeUrl.listUrl();

    const marqueeContent = document.getElementById("marquee-content");
    const data = await apiStorage.getData(listUrl);
    data.forEach((obj) => {
      marqueeContent.appendChild(createTickerItem(obj));
    });
    data.forEach((obj) => {
      marqueeContent.appendChild(createTickerItem(obj));
    });
    data.forEach((obj) => {
      marqueeContent.appendChild(createTickerItem(obj));
    });

    marqueeLoading.style.display = "none";
  });

  searchButton.addEventListener("click", async () => {
    const query = searchInput.value;
    const url = makeUrl.searchURL(query);
    const loading = document.getElementById("loading");

    loading.style.display = "initial";
    const data = await apiStorage.getData(url);
    loading.style.display = "none";

    const promises = data.map((company) =>
      apiStorage.getData(makeUrl.companyUrl(company.symbol))
    );
    const companies = await Promise.all(promises);
    render(companies);
    highlight(query);

    searchInput.value = "";
  });
});

function highlight(query) {
  const companies = document.getElementsByClassName("company");
  const escapedPattern = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(escapedPattern, "gi");
  companies.forEach((company) => {
    company.innerHTML = company.innerHTML.replace(
      re,
      (match) => `<mark>${match}</mark>`
    );
  });
}

function createTickerItem(obj) {
  const { symbol, priceWhenPosted } = obj;
  const li = document.createElement("li");
  li.setAttribute("id", symbol);
  li.setAttribute("class", "ticker-item");

  const p = document.createElement("p");
  p.setAttribute("id", symbol);
  p.innerHTML = symbol;
  p.style.paddingRight = "10px";
  li.appendChild(p);

  const change = document.createElement("p");
  change.setAttribute("id", `${symbol}-price`);
  change.innerHTML = priceWhenPosted;
  change.style.color = "green";
  li.appendChild(change);
  return li;
}

function createCompany(company) {
  const { image, companyName, symbol, changePercentage } = company;

  const companyContainer = document.createElement("div");
  companyContainer.setAttribute("class", "company-container");
  companyContainer.style.display = "flex";

  const imageContainer = document.createElement("div");
  imageContainer.setAttribute("id", `${symbol}-image-container`);

  const img = document.createElement("img");
  img.setAttribute("id", `${symbol}-image`);
  img.setAttribute("src", image);
  img.style.height = "30px";
  img.style.paddingRight = "20px";
  imageContainer.appendChild(img);
  companyContainer.appendChild(imageContainer);

  const a = document.createElement("a");
  a.setAttribute("class", "company");
  a.setAttribute("id", symbol);
  a.setAttribute("href", `/company/index.html?symbol=${symbol}`);
  a.setAttribute("target", "_blank");
  a.innerHTML = `${companyName} (${symbol})`;
  a.style.alignSelf = "center";
  companyContainer.appendChild(a);

  const change = document.createElement("p");
  change.setAttribute("id", `${symbol}-change-percentage`);
  change.innerHTML = changePercentage;
  return companyContainer;
}

const render = (companies) => {
  const searchResults = document.getElementById("search-results");
  searchResults.innerHTML = "";
  companies.forEach((company) => {
    searchResults.appendChild(createCompany(company[0]));
  });
};
