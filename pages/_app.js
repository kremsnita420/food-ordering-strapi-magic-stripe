import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { AuthProvider } from '../context/AuthContext'

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </AuthProvider>

  )
}
