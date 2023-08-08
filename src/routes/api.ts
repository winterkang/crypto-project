import { InfoData, PriceData } from './Coin'
// fetcher 함수는 반드시 fetch promise를 반환해야한다
const BASE_URL = `https://api.coinpaprika.com/v1`
// Coins(메인에서 상세페이지로 넘어갈 때 로딩 안함)
export const fetchCoins = () => {
  return fetch(`${BASE_URL}/coins`).then(response => response.json())
}
// Coin(상세페이지에서 메인으로 넘어갈 때 로딩 안함)
export const fetchCoinInfo = (coinId: string): Promise<InfoData> => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json())
}
export const fetchCoinTickers = (coinId: string): Promise<PriceData> => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then(response =>
    response.json()
  )
}
// Chart
export const fetchCoinHistory = (coinId: string) => {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then(response => response.json())
}
