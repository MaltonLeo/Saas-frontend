

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }


import '@/styles/globals.css';
import Navbar from '@/components/navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

