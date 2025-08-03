import * as makeUrl from "../utils/makeUrl.js";
import getData from "../utils/getData.js";

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);

  let symbol;
  for (const [key, value] of urlParams.entries()) {
    if (key === "symbol") {
      symbol = value;
    }
  }
  if (!symbol) throw new Error("no symbol");

  document.title = `${symbol} Company Page`;
  const loadingCompanyData = document.getElementById("loading-company-data");
  loadingCompanyData.style.display = "initial";
  const url = makeUrl.companyUrl(symbol);
  const data = await getData(url);
  loadingCompanyData.style.display = "none";
  render(data[0]);

  const loadingHistoricalData = document.getElementById(
    "loading-historical-data"
  );
  loadingHistoricalData.style.display = "initial";
  const history = makeUrl.historyUrl(symbol);
  const historicalData = await getData(history);
  loadingHistoricalData.style.display = "none";
  renderHistoricalData(historicalData);
});

const render = (data) => {
  const {
    companyName,
    symbol,
    price,
    image,
    changePercentage,
    website,
    description,
  } = data;

  const companyDataContainer = document.getElementById(
    "company-data-container"
  );

  const titleRow = document.createElement("div");
  titleRow.setAttribute("id", "title-row");

  const imageContainer = document.createElement("div");
  imageContainer.setAttribute("id", "image-container");

  const img = document.createElement("img");
  img.setAttribute("id", "image");
  img.setAttribute("src", image);
  imageContainer.appendChild(img);
  titleRow.appendChild(imageContainer);

  const companyNameSymbol = document.createElement("h1");
  companyNameSymbol.setAttribute("id", "company-name-symbol");
  companyNameSymbol.innerHTML = `${companyName} (${symbol})`;
  titleRow.appendChild(companyNameSymbol);
  companyDataContainer.appendChild(titleRow);

  const priceChange = document.createElement("div");
  priceChange.setAttribute("id", "price-change");

  const p = document.createElement("p");
  p.setAttribute("id", "price");
  p.innerHTML = price;
  priceChange.appendChild(p);

  const change = document.createElement("p");
  change.setAttribute("id", "change-percentage");
  change.innerHTML = changePercentage;
  change.style.color =
    changePercentage === 0
      ? "black"
      : changePercentage > 0
      ? "light-green"
      : "red";
  priceChange.appendChild(change);
  companyDataContainer.appendChild(priceChange);

  const detailsContainer = document.createElement("div");
  detailsContainer.setAttribute("id", "details-container");

  const address = document.createElement("p");
  address.setAttribute("id", "website");
  address.innerHTML = website;
  detailsContainer.appendChild(address);

  const desc = document.createElement("p");
  desc.setAttribute("id", "description");
  desc.innerHTML = description;
  detailsContainer.appendChild(desc);

  companyDataContainer.appendChild(detailsContainer);
};

const renderHistoricalData = (historicalData) => {
  const historicalDataContainer = document.getElementById(
    "historical-data-container"
  );

  // Clear previous chart if any
  historicalDataContainer.innerHTML = "";

  // Create canvas for Chart.js
  const canvas = document.createElement("canvas");
  canvas.id = "historical-chart";
  historicalDataContainer.appendChild(canvas);

  // Prepare data for Chart.js

  const historical = historicalData.historical;

  const labels = historical.map((item) => item.label).reverse();
  const closes = historical.map((item) => item.close).reverse();

  // Chart.js config
  new Chart(canvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Close Price",
          data: closes,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
      },
      scales: {
        x: { title: { display: true, text: "Date" } },
        y: { title: { display: true, text: "Close Price" } },
      },
    },
  });
};
