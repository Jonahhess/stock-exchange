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
