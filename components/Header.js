
import Link from "next/link"
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })
export default function Header() {
    return (
        <div className={inter.className}>
            <header className="w3-container w3-theme w3-padding-large">
                <div className="w3-center w3-padding-large">
                    <h4>Easily Download Cryptocurrency Market Data</h4>
                    <h1 className="w3-xxxlarge w3-animate-bottom">TRADE TRACKER</h1>
                    <p className="w3-hide-small">Get instant access to a wide range of market data, including recent trades, aggregate trades, candlestick data, and more.</p>
                    <p>
                        <Link href="/" className="w3-button w3-padding w3-green w3-round w3-text-white"><b>HOME</b></Link>
                    </p>
                </div>
            </header>
        </div>
    )
}