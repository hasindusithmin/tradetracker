import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';



export default function Coin() {

    const ROUTER = useRouter()
    const [COIN, SET_COIN] = useState(null)
    useEffect(() => {
        const { coin } = ROUTER.query;
        SET_COIN(coin)
    }, [])

    return (
        <>
            <Head>
                {COIN && <title>TradeTracker | {COIN.toUpperCase() + 'USDT'}</title>}
                {COIN && <meta name="description" content={`Download Recent Trades List,Aggregate Trades List,Candlestick Data,24hr Ticker Price Change Statistics ,Symbol Order Book Ticker in ${COIN.toUpperCase() + 'USDT'} Market.`} />}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {COIN && <link rel="icon" href={`/icons/${COIN}.svg`} />}
            </Head>

            <main>
                {/* Recent Trades List,Aggregate Trades List,Candlestick Data,24hr Ticker Price Change Statistics ,Symbol Order Book Ticker */}
                <div className="w3-row-padding w3-center w3-margin-top">
                    <div class="w3-third w3-padding">
                        <div className='w3-card w3-round-large w3-padding'>
                            Recent Trades List
                        </div>
                    </div>
                    <div class="w3-third w3-padding">
                        <div className='w3-card w3-round-large w3-padding'>
                            Aggregate Trades List
                        </div>

                    </div>
                    <div class="w3-third w3-padding">
                        <div className='w3-card w3-round-large w3-padding'>
                            Candlestick Data
                        </div>

                    </div>
                </div>

                <div className="w3-row-padding w3-center w3-margin-top">
                    <div class="w3-third w3-padding">
                        <div className=' w3-card w3-round-large w3-padding'>
                            UiCandlestick Data
                        </div>
                    </div>
                    <div class="w3-third w3-padding">
                        <div className='w3-card w3-round-large w3-padding'>
                            24hr Ticker Price Change Statistics
                        </div>
                    </div>
                    <div class="w3-third w3-padding">
                        <div className=' w3-card w3-round-large w3-padding'>
                            Symbol Order Book Ticker
                        </div>
                    </div>

                </div>

            </main>

        </>
    )
}