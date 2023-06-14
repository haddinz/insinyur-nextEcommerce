// import { useEffect } from 'react'
// import '../styles/globals.css'
import { StoreProvider } from "../Utils/Store";
import { SnackbarProvider } from "notistack";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../Utils/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

// function MyApp({ Component, pageProps }) {
function MyApp (props ) {

  // useEffect(() => {
  //   const jssStyle = document.querySelector('#jss-server-side')
  //   if (jssStyle) {
  //     jssStyle.parentElement.removeChild(jssStyle)
  //   }
  // }, [])

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <StoreProvider>
          <PayPalScriptProvider deferLoading={true}>
            <Component {...pageProps} />
          </PayPalScriptProvider>
        </StoreProvider>
      </SnackbarProvider>
    </CacheProvider>
  );
}

export default MyApp;
