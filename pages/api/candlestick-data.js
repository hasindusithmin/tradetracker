

import fetch from "node-fetch"

// /api/candlestick-data

export default async function handler(req, res) {
    try {
        const { symbol, interval, limit } = req.query;
        if (!symbol || !interval) throw Error("symbol(query) & interval(query) is required")
        const URL = (limit) ? `https://www.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=1000` : `https://www.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}`
        const RES = await fetch(URL)
        if (!RES.ok) throw Error("Sorry, data can't be fetched at this moment")
        let array = await RES.json();
        let objectArray = [];
        array.forEach(_=>{
            const obj = {};
            obj['openTime'] = _[0];
            obj['open'] = _[1];
            obj['high'] = _[2];
            obj['low'] = _[3];
            obj['close'] = _[4];
            obj['volume'] = _[5];
            obj['closeTime'] = _[6];
            obj['Quote asset volume'] = _[7];
            obj['Number of trades'] = _[8];
            obj['Taker buy base asset volume'] = _[9];
            obj['Taker buy quote asset volume'] = _[10];
            objectArray.push(obj);
        })
        res.status(200).json({ message: objectArray });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}