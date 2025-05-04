

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

// import '@/styles/globals.css'
// import Navbar from '@/components/navbar'

// export default function App({ Component, pageProps }) {
//   return (
//     <>
//       <Navbar />
//       <Component {...pageProps} />
//     </>
//   )
// }


// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function MyApp({ Component, pageProps }) {
//   return (
//     <>
//       <Component {...pageProps} />
//       <ToastContainer position="top-right" autoClose={3000} />
//     </>
//   );
// }

// export default MyApp;
