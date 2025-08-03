import model from "./model.js";
import getData from "./getData.js";

export const init = () => {
  return model;
};

export const search = async (url) => {
  const data = await getData(url);
  model.stocks = data;
  return model;
};
