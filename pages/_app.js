import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

import { CartProvider } from '../context/cartContext';


function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </CartProvider>
  );
}

export default MyApp;
