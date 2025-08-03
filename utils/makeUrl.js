import apikey from "./apikey.js";
export const searchURL = (
  query,
  params = { limit: 10, exchange: "NASDAQ" }
) => {
  if (typeof query !== "string") throw new Error("invalid query");
  if (typeof params !== "object") throw new Error("invalid params");
  if (typeof apikey !== "string") throw new Error("invalid api key");

  const baseUrl = "https://financialmodelingprep.com/stable/search-symbol";

  const paramsString = Object.entries(params)
    .map(([k, v]) => `${k}=${v}&`)
    .join("");
  const url = `${baseUrl}?query=${query}&${paramsString}apikey=${apikey}`;

  return url;
};

export const companyUrl = (symbol) => {
  const baseUrl = "https://financialmodelingprep.com/stable/profile";

  const url = `${baseUrl}?symbol=${symbol}&apikey=${apikey}`;
  return url;
};

export const historyUrl = (symbol) => {
  const baseUrl =
    "https://financialmodelingprep.com/api/v3/historical-price-full";

  const url = `${baseUrl}/${symbol}?serieType=line&apikey=${apikey}`;
  return url;
};
