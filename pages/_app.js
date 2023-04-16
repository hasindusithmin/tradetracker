import '../styles/globals.css'
import '../styles/black.css'
import '../styles/autoComplete.min.css'
import '../styles/datatable.css'
import 'react-toastify/dist/ReactToastify.css';
import 'rodal/lib/rodal.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
