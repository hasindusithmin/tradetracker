import Head from 'next/head'
import { Inter } from '@next/font/google'
import ICONS from "../public/icons.json";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Search from '../components/Search';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [GROUPS, SET_GROUPS] = useState(null);
  useEffect(() => {
    const _ = Object.values(ICONS).reduce((acc, curr) => {
      if (acc.length === 0 || acc[acc.length - 1].length === 6) {
        acc.push([curr]);
      } else {
        acc[acc.length - 1].push(curr);
      }
      return acc;
    }, []);
    SET_GROUPS(_)
  }, [])

  return (
    <>
      <Head>
        <title>TradeTracker | Home</title>
        <meta name="description" content="Download Recent Trades List,Aggregate Trades List,Candlestick Data,24hr Ticker Price Change Statistics ,Symbol Order Book Ticker." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <main>

        <div className={`${inter.className} w3-white w3-margin w3-card w3-round-large w3-padding`}>
          <p className="w3-center w3-large" style={{ fontWeight: 500 }}>
            Welcome to tradetracker for downloading cryptocurrency market data! Our goal is to provide a simple and convenient way for users to access the latest information on a wide range of cryptocurrencies.
          </p>
          <p className='w3-row'>
            <p className='w3-third w3-center'>
              <Image src="/crypto.gif" alt="crypto" className='w3-round-large' width={500} height={281} />
            </p>
            <p className='w3-twothird'>
              <p>
                On our home page, users can search for the specific cryptocurrency they are interested in or browse through a list of popular options. From there, they can access a range of data sources including the <code>Recent Trades List, Aggregate Trades List, Candlestick Data, and 24hr Ticker Price Change Statistics</code>, all of which can be downloaded as <code>CSV</code> files for further analysis.
              </p>
              <p>
                In addition to these core features, we also offer a symbol order book ticker and other market analysis tools to help users stay up-to-date on the latest trends and developments in the cryptocurrency market. Whether you're a casual investor or a professional trader, our web application has everything you need to make informed decisions about your cryptocurrency portfolio.
              </p>
              <p>
                We hope you find our web application useful and look forward to helping you stay on top of the ever-evolving world of cryptocurrencies.
              </p>
            </p>
          </p>
        </div>

        <Search hideHeader={false} />

        <div className="w3-white w3-margin w3-card w3-round-large">
          <div className="w3-container w3-padding w3-black">
            <h4><b>TAGS</b></h4>
          </div>
          <div className="w3-white">
            {
              GROUPS &&
              <p className='w3-center'>
                {
                  GROUPS.map(GROUP => (

                    <div className="w3-row w3-responsive" key={Math.random()}>
                      {
                        GROUP.map(COIN => (
                          <div className="w3-col s2" key={COIN + Math.random()} id={COIN.toUpperCase() + 'USDT'}>
                            <span className="w3-tag w3-margin-bottom w3-white" >
                              <Image src={`/icons/${COIN}.svg`} alt={COIN} width={32} height={32} title={COIN.toUpperCase()} />&nbsp;&nbsp;
                              <Link href={`/cryptov2/${COIN}`} style={{ textDecoration: 'none' }}>
                                <span className='w3-small w3-tag w3-dark-grey w3-text-white w3-round-large'><b>{COIN.toUpperCase()}USDT</b></span> &nbsp;
                              </Link>
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  ))
                }
              </p>
            }
          </div>
        </div>
      </main>
    </>
  )
}
