import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Inter } from '@next/font/google'
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import RTLModal from '../../modal/RTLModal';
import ATLModal from '../../modal/ATLModal';
import TPCModal from '../../modal/TPCModal';
import SOBModal from '../../modal/SOBModal';
import CDModal from '../../modal/CDModal';
import UCDModal from '../../modal/UCDModal';
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
    }, [COIN])

    // Recent Trades List
    const [reqRTL, setReqRTL] = useState([]);
    const fetchRTL = async (e) => {
        try {
            e.target.disabled = true;
            if (window.navigator.userAgentData['mobile']) throw Error("Sorry, this feature is not yet ready for mobile devices")
            const res = await fetch(`/api/recent-trades-list?symbol=${COIN + 'usdt'}`)
            const { message } = await res.json();
            if (!res.ok) throw Error(message);
            const id = toast.loading('Processing...')
            setTimeout(() => {
                toast.update(id, { render: "Successfully", type: "success", isLoading: false, autoClose: 1000, hideProgressBar: true });
                setReqRTL(message);
            }, 1500)
            e.target.disabled = false;
        } catch (error) {
            e.target.disabled = false;
            toast.error(error.message, { autoClose: 1500, hideProgressBar: true });
        }
    }

    // Aggregate Trades List
    const [reqATL, setReqATL] = useState([]);
    const fetchATL = async (e) => {
        try {
            e.target.disabled = true;
            if (window.navigator.userAgentData['mobile']) throw Error("Sorry, this feature is not yet ready for mobile devices")
            const res = await fetch(`/api/aggregate-trades-list?symbol=${COIN + 'usdt'}`)
            const { message } = await res.json();
            if (!res.ok) throw Error(message);
            const id = toast.loading('Processing...')
            setTimeout(() => {
                toast.update(id, { render: "Successfully", type: "success", isLoading: false, autoClose: 1000, hideProgressBar: true });
                setReqATL(message);
            }, 1500)
            e.target.disabled = false;
        } catch (error) {
            e.target.disabled = false;
            toast.error(error.message, { autoClose: 1500, hideProgressBar: true });
        }
    }

    // 24hr Ticker Price Change
    const [reqTPC, setReqTPC] = useState({});
    const fetchTPC = async (e) => {
        try {
            e.target.disabled = true;
            if (window.navigator.userAgentData['mobile']) throw Error("Sorry, this feature is not yet ready for mobile devices")
            const res = await fetch(`/api/ticker-price-change?symbol=${COIN + 'usdt'}`)
            const { message } = await res.json();
            if (!res.ok) throw Error(message);
            const id = toast.loading('Processing...')
            setTimeout(() => {
                toast.update(id, { render: "Successfully", type: "success", isLoading: false, autoClose: 1000, hideProgressBar: true });
                setReqTPC(message);
            }, 1500)
            e.target.disabled = false;
        } catch (error) {
            e.target.disabled = false;
            toast.error(error.message, { autoClose: 1500, hideProgressBar: true });
        }
    }

    // Symbol Order Book Ticker
    const [reqSOB, setReqSOB] = useState({});
    const fetchSOB = async (e) => {
        try {
            e.target.disabled = true;
            if (window.navigator.userAgentData['mobile']) throw Error("Sorry, this feature is not yet ready for mobile devices")
            const res = await fetch(`/api/symbol-order-book?symbol=${COIN + 'usdt'}`)
            const { message } = await res.json();
            if (!res.ok) throw Error(message);
            const id = toast.loading('Processing...')
            setTimeout(() => {
                toast.update(id, { render: "Successfully", type: "success", isLoading: false, autoClose: 1000, hideProgressBar: true });
                setReqSOB(message);
            }, 1500)
            e.target.disabled = false;
        } catch (error) {
            e.target.disabled = false;
            toast.error(error.message, { autoClose: 1500, hideProgressBar: true });
        }
    }

    // Candlestick Data
    const [reqCD, setReqCD] = useState([]);
    const [cdTimeFrame, setCdTimeFrame] = useState(null);
    const [cdMax, setCdMax] = useState(false);
    const fetchCD = async (e) => {
        try {
            e.target.disabled = true;
            if (window.navigator.userAgentData['mobile']) throw Error("Sorry, this feature is not yet ready for mobile devices")
            let url = `/api/candlestick-data?symbol=${COIN + 'usdt'}&interval=${cdTimeFrame}`
            if (cdMax) {
                url = `/api/candlestick-data?symbol=${COIN + 'usdt'}&interval=${cdTimeFrame}&limit=1000`
            }
            const res = await fetch(url);
            const { message } = await res.json();
            if (!res.ok) throw Error(message);
            const id = toast.loading('Processing...')
            setTimeout(() => {
                toast.update(id, { render: "Successfully", type: "success", isLoading: false, autoClose: 1000, hideProgressBar: true });
                setReqCD(message);
            }, 1500)
            e.target.disabled = false;
        } catch (error) {
            e.target.disabled = false;
            toast.error(error.message, { autoClose: 1500, hideProgressBar: true });
        }
    }

    // UICandlestick Data
    const [reqUCD, setReqUCD] = useState([]);
    const [ucdTimeFrame, setUcdTimeFrame] = useState(null);
    const [ucdMax, setUcdMax] = useState(false);
    const fetchUcd = async (e) => {
        try {
            e.target.disabled = true;
            if (window.navigator.userAgentData['mobile']) throw Error("Sorry, this feature is not yet ready for mobile devices")
            let url = `/api/ui-candlestick-data?symbol=${COIN + 'usdt'}&interval=${ucdTimeFrame}`
            if (ucdMax) {
                url = `/api/ui-candlestick-data?symbol=${COIN + 'usdt'}&interval=${ucdTimeFrame}&limit=1000`
            }
            const res = await fetch(url);
            const { message } = await res.json();
            if (!res.ok) throw Error(message);
            const id = toast.loading('Processing...')
            setTimeout(() => {
                toast.update(id, { render: "Successfully", type: "success", isLoading: false, autoClose: 1000, hideProgressBar: true });
                setReqUCD(message);
            }, 1500)
            e.target.disabled = false;
        } catch (error) {
            e.target.disabled = false;
            toast.error(error.message, { autoClose: 1500, hideProgressBar: true });
        }
    }

    return (
        <>
            <Head>
                {COIN && <title>TradeTracker | {COIN.toUpperCase() + 'USDT'}</title>}
                {COIN && <meta name="description" content={`Download Recent Trades List,Aggregate Trades List,Candlestick Data,24hr Ticker Price Change Statistics ,Symbol Order Book Ticker in ${COIN.toUpperCase() + 'USDT'} Market.`} />}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {COIN && <link rel="icon" href={`/icons/${COIN}.svg`} />}
            </Head>

            <ToastContainer />
            <RTLModal reqRTL={reqRTL} setReqRTL={setReqRTL} />
            <ATLModal reqATL={reqATL} setReqATL={setReqATL} />
            <TPCModal reqTPC={reqTPC} setReqTPC={setReqTPC} />
            <SOBModal reqSOB={reqSOB} setReqSOB={setReqSOB} />
            <CDModal reqCD={reqCD} setReqCD={setReqCD} />
            <UCDModal reqUCD={reqUCD} setReqUCD={setReqUCD} />


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
                        <div className="w3-third w3-padding">
                            <div className='w3-card w3-round-large w3-padding'>
                                <h3><b>Recent Trades List</b></h3>
                                <p className='w3-justify'>
                                    A list of trades that have recently occurred on a particular exchange or for a particular security.
                                </p>
                                {
                                    COIN &&
                                    <button className='w3-button w3-padding w3-round w3-green' onClick={fetchRTL}>Download</button>
                                }
                            </div>
                        </div>
                        <div className="w3-third w3-padding">
                            <div className='w3-card w3-round-large w3-padding'>
                                <h3><b>Aggregate Trades List</b></h3>
                                <p className='w3-justify'>
                                    A list of all trades that have occurred on a particular exchange or for a particular security over a specific period of time.
                                </p>
                                {
                                    COIN &&
                                    <button className='w3-button w3-padding w3-round w3-green' onClick={fetchATL}>Download</button>
                                }
                            </div>

                        </div>
                        <div className="w3-third w3-padding">
                            <div className='w3-card w3-round-large w3-padding'>
                                <h3><b>Candlestick Data</b></h3>
                                <p className='w3-justify'>
                                    Data used to create candlestick charts, which are a type of chart used to visualize price movements of a security or currency.
                                </p>
                                <select className='w3-select' value={cdTimeFrame} onInput={e => setCdTimeFrame(e.target.value)}>
                                    {OPT && OPT.map(OP => <option key={OP} value={OP}>{OP}</option>)}
                                </select>
                                <div className='w3-padding'>
                                    MAX : <input className="w3-check" type="checkbox" onInput={e => setCdMax(e.target.checked)} />
                                </div>
                                {
                                    COIN && cdTimeFrame &&
                                    <button className='w3-button w3-padding w3-round w3-green' onClick={fetchCD}>Download</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w3-row-padding w3-center w3-margin-top">
                    <div className="w3-third w3-padding">
                        <div className=' w3-card w3-round-large w3-padding'>
                            <h3><b>UiCandlestick Data</b></h3>
                            <p className='w3-justify'>
                                Data displayed in UIKlines charts, which are used to display financial data such as stock prices or exchange rates.
                            </p>
                            <select className='w3-select' value={ucdTimeFrame} onInput={e => setUcdTimeFrame(e.target.value)}>
                                {OPT && OPT.map(OP => <option key={OP} value={OP}>{OP}</option>)}
                            </select>
                            <div className='w3-padding'>
                                MAX : <input className="w3-check" type="checkbox" onInput={e => setUcdMax(e.target.checked)} />
                            </div>
                            {
                                COIN && ucdTimeFrame &&
                                <button className='w3-button w3-padding w3-round w3-green' onClick={fetchUcd}>Download</button>
                            }
                        </div>
                    </div>
                    <div className="w3-third w3-padding">
                        <div className='w3-card w3-round-large w3-padding'>
                            <h3><b>24hr Ticker Price Change Statistics</b></h3>
                            <p className='w3-justify'>
                                Statistics that show the price changes of a particular security or currency over a 24-hour period.
                            </p>
                            {
                                COIN &&
                                <button className='w3-button w3-padding w3-round w3-green' onClick={fetchTPC}>Download</button>
                            }
                        </div>
                    </div>
                    <div className="w3-third w3-padding">
                        <div className=' w3-card w3-round-large w3-padding'>
                            <h3><b>Symbol Order Book Ticker</b></h3>
                            <p className='w3-justify'>
                                A real-time display of the orders in the order book for a particular security or currency on an exchange.
                            </p>
                            {
                                COIN &&
                                <button className='w3-button w3-padding w3-round w3-green' onClick={fetchSOB}>Download</button>
                            }
                        </div>
                    </div>

                </div>

            </main>

        </>
    )
}