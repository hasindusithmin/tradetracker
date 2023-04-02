

import fetch from "node-fetch"

// /api/ticker-price-change

export default async function handler(req, res) {
    try {
        const { symbol } = req.query;
        if (!symbol) throw Error("Symbol(query) is required")
        const URL = `https://www.binance.com/api/v3/ticker/24hr?symbol=${symbol.toUpperCase()}`
        const RES = await fetch(URL)
        if (!RES.ok) throw Error("Sorry, data can't be fetched at this moment")
        const DATA = await RES.json()
        res.status(200).json({ message: DATA });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}