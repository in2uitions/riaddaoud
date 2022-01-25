// import '../styles/globals.css'
import '../public/assets/css/sheet.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
// import '@fortawesome/fontawesome-free/js/solid';
// import '@fortawesome/fontawesome-free/js/regular';
// import '@fortawesome/fontawesome-free/js/brands';
import Header from './HEAD/head.js';
import sendpulse from "sendpulse-api";
import ReactDOM from "react-dom";
import '../i18n';



function MyApp({ Component, pageProps }) {
  return (
    <>
    <Header description="this is the discription of the header" title="this is the title of the header" />
  <Component {...pageProps} />
  </>
  )

}

export default MyApp
