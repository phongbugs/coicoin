import axios from 'axios';

export const FETCH_PRICE_URL = '/price';

export function fetchPrice(coinSymbols) {
  return axios.post(`${FETCH_PRICE_URL}/${coinSymbols}`);
}
