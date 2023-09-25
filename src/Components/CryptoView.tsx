import { getBinancePrice, getKrakenPrice } from "../Api/getPrice";
import { useEffect, useState } from "react";

function CryptoView() {

    const [binancePrice, setBinancePrice] = useState('');
    const [krakenPrice, setKrakenPrice] = useState('');

    const validCryptoType = ['eth', 'btc'];

    const url = window.location.href;
    const cryptoType = url.split("/").pop();

    let symbol = '';
    let krakenSymbol = '';

    if(cryptoType === 'eth'){ symbol = 'ETHUSDT'; krakenSymbol = 'ETHUSDT'; }
    if(cryptoType === 'btc'){ symbol = 'BTCUSDT'; krakenSymbol = 'XBTUSDT'; }

    useEffect(()=>{
        if(symbol !== ''){
            const interval = setInterval(() => {
                const promise = getBinancePrice(symbol);
                promise.then((response) => {
                    setBinancePrice(response.data.price);
                })
                .catch((error) => {
                    console.log(error);
                });
            }, 1000);
        
            return () => clearInterval(interval);
        }
    }, []);

    useEffect(()=>{
        if(symbol !== ''){
            const interval = setInterval(() => {
                const promise = getKrakenPrice(symbol);
                promise.then((response) => {
                    setKrakenPrice(response.data.result[krakenSymbol].a[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
            }, 1000);
        
            return () => clearInterval(interval);
        }
    }, []);
    
    return (
        <div>
            {
                !validCryptoType.includes(cryptoType || '') &&
                <div>not a valid crypto type</div>
            }

            <div>Binance : {binancePrice}</div>
            <div>Kraken : {krakenPrice}</div>

            <div>{'CHEAPEST ('+(binancePrice > krakenPrice ? 'KRAKEN): '+krakenPrice : 'BINANCE): '+ binancePrice)}</div>
        </div>
    );
}
  
export default CryptoView;