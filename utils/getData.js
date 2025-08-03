async function getData(url) {
  const cached = localStorage.getItem(url);
  if (cached) return JSON.parse(cached);

  const response = await fetch(url);
  if (!response.ok) throw new Error("bad path");

  const data = await response.json();

  const stringifiedData = JSON.stringify(data);
  localStorage.setItem(url, stringifiedData);

  return data;
}

export default getData;
