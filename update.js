import model from "./model.js";
import getData from "./utils/getData.js";

export const init = () => {
  return model;
};

export const search = async (url) => {
  const data = await getData(url);
  model.stocks = data;
  return model;
};
