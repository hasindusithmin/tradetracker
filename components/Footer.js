
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Footer(){

    return (
        <div className="w3-padding w3-center">
            <p className={inter.className}>
                Copyright &copy; 2023 tradetracker.vercel.app. All rights reserved.
            </p>
        </div>
    )

}