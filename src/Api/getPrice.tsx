import { binance_url, kraken_url } from '../constants/api_url';
import axios from 'axios';

export function getBinancePrice(symbol: string) {
    return axios.get(binance_url+symbol);
}

export function getKrakenPrice(symbol: string) {
    return axios.get(kraken_url+symbol);
}