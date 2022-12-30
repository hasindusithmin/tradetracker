import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Inter } from '@next/font/google'
import Image from 'next/image';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] })

export default function Coin() {

    const ROUTER = useRouter()
    const [COIN, SET_COIN] = useState(null)
    const [INTERVAL_1, SET_INTERVAL_1] = useState(null)
    const [LIMIT_1, SET_LIMIT_1] = useState(500)
    const [INTERVAL_2, SET_INTERVAL_2] = useState(null)
    const [LIMIT_2, SET_LIMIT_2] = useState(500)

    const URL = 'https://cryptomarketapi.deta.dev';
    const OPT = ['1s', '1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M']
    useEffect(() => {
        const { coin } = ROUTER.query;
        SET_COIN(coin)
    }, [])

    const set_interval_1 = e => {
        SET_INTERVAL_1(e.target.value)
    }

    const set_limit_1 = e => {
        if (LIMIT_1 === 500) SET_LIMIT_1(1000)
        else SET_LIMIT_1(500)
    }

    const set_interval_2 = e => {
        SET_INTERVAL_2(e.target.value)
    }

    const set_limit_2 = e => {
        if (LIMIT_2 === 500) SET_LIMIT_2(1000)
        else SET_LIMIT_2(500)
    }

    return (
        <>
            <Head>
                {COIN && <title>TradeTracker | {COIN.toUpperCase() + 'USDT'}</title>}
                {COIN && <meta name="description" content={`Download Recent Trades List,Aggregate Trades List,Candlestick Data,24hr Ticker Price Change Statistics ,Symbol Order Book Ticker in ${COIN.toUpperCase() + 'USDT'} Market.`} />}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {COIN && <link rel="icon" href={`/icons/${COIN}.svg`} />}
            </Head>

            <main>

                <div className={inter.className}>
                    {
                        COIN &&
                        <>
                            <h1 className='w3-center w3-opacity'><b>{COIN.toUpperCase() + 'USDT'}</b></h1>
                            <div className='w3-center'>
                                <Image src={`/icons/${COIN}.svg`} alt={COIN} width={100} height={100} />
                            </div>
                        </>
                    }

                </div>

                <div className="w3-row-padding w3-center w3-margin-top">
                    <div className={inter.className}>
                        <div class="w3-third w3-padding">
                            <div className='w3-card w3-round-large w3-padding'>
                                <h3><b>Recent Trades List</b></h3>
                                <p className='w3-justify'>
                                    A list of trades that have recently occurred on a particular exchange or for a particular security.
                                </p>
                                {
                                    COIN &&
                                    <Link href={`${URL}/recent-trades?symbol=${COIN}usdt`} className='w3-button w3-padding w3-round w3-green'>Download</Link>
                                }
                            </div>
                        </div>
                        <div class="w3-third w3-padding">
                            <div className='w3-card w3-round-large w3-padding'>
                                <h3><b>Aggregate Trades List</b></h3>
                                <p className='w3-justify'>
                                    A list of all trades that have occurred on a particular exchange or for a particular security over a specific period of time.
                                </p>
                                {
                                    COIN &&
                                    <Link href={`${URL}/aggregate-trades?symbol=${COIN}usdt`} className='w3-button w3-padding w3-round w3-green'>Download</Link>
                                }
                            </div>

                        </div>
                        <div class="w3-third w3-padding">
                            <div className='w3-card w3-round-large w3-padding'>
                                <h3><b>Candlestick Data</b></h3>
                                <p className='w3-justify'>
                                    Data used to create candlestick charts, which are a type of chart used to visualize price movements of a security or currency.
                                </p>
                                <select className='w3-select' onInput={set_interval_1}>
                                    {OPT && OPT.map(OP => <option key={OP} value={OP}>{OP}</option>)}
                                </select>
                                <div className='w3-padding'>
                                    MAX : <input className="w3-check" type="checkbox" onClick={set_limit_1} />
                                </div>
                                {
                                    COIN && INTERVAL_1 &&
                                    <Link href={`${URL}/candlestick-data?symbol=${COIN}usdt&interval=${INTERVAL_1}&limit=${LIMIT_1}`} className='w3-button w3-padding w3-round w3-green'>Download</Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w3-row-padding w3-center w3-margin-top">
                    <div class="w3-third w3-padding">
                        <div className=' w3-card w3-round-large w3-padding'>
                            <h3><b>UiCandlestick Data</b></h3>
                            <p className='w3-justify'>
                                Data displayed in UIKlines charts, which are used to display financial data such as stock prices or exchange rates.
                            </p>
                            <select className='w3-select' onInput={set_interval_2}>
                                {OPT && OPT.map(OP => <option key={OP} value={OP}>{OP}</option>)}
                            </select>
                            <div className='w3-padding'>
                                MAX : <input className="w3-check" type="checkbox" onClick={set_limit_2} />
                            </div>
                            {
                                COIN && INTERVAL_2 &&
                                <Link href={`${URL}/uiklines-data?symbol=${COIN}usdt&interval=${INTERVAL_2}&limit=${LIMIT_2}`} className='w3-button w3-padding w3-round w3-green'>Download</Link>
                            }
                        </div>
                    </div>
                    <div class="w3-third w3-padding">
                        <div className='w3-card w3-round-large w3-padding'>
                            <h3><b>24hr Ticker Price Change Statistics</b></h3>
                            <p className='w3-justify'>
                                Statistics that show the price changes of a particular security or currency over a 24-hour period.
                            </p>
                            {
                                COIN &&
                                <Link href={`${URL}/ticker-price-change-24hr?symbols=${COIN}usdt`} className='w3-button w3-padding w3-round w3-green'>Download</Link>
                            }
                        </div>
                    </div>
                    <div class="w3-third w3-padding">
                        <div className=' w3-card w3-round-large w3-padding'>
                            <h3><b>Symbol Order Book Ticker</b></h3>
                            <p className='w3-justify'>
                                A real-time display of the orders in the order book for a particular security or currency on an exchange.
                            </p>
                            {
                                COIN &&
                                <Link href={`${URL}/order-book-ticker?symbols=${COIN}usdt`} className='w3-button w3-padding w3-round w3-green'>Download</Link>
                            }
                        </div>
                    </div>

                </div>

            </main>

        </>
    )
}