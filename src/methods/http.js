import { REST_URL } from "../config.js";
export async function fetchMeals() {
  const response = await fetch(`${REST_URL}/meals`);
  const datas = await response.json();
  if (!response.ok) {
    throw new Error(`${response.status}:${response.text}`);
  }
  return datas;
}
