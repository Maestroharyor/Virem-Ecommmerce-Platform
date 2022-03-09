import App from 'next/app';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor, configureStore} from '../store/store';
import DefaultLayout from '../components/layouts/DefaultLayout';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../scss/style.scss';
import '../scss/home-default.scss';
import '../scss/market-place-1.scss';
import 'slick-carousel/slick/slick.css';
import '../public/static/css/custom.css'


function MyApp({ Component, pageProps }) {
  const router = useRouter()

    useEffect(()=>{
        setTimeout(function () {
            document.getElementById('__next').classList.add('loaded');
        }, 500);
    }, [])

    useEffect(() => {
      const addLoader = (url, { shallow }) => {
        console.log(
          `App is changing to ${url} ${
            shallow ? 'with' : 'without'
          } shallow routing`
        )
        document.getElementById('__next').classList.remove('loaded');
      }
      const removeLoader = (url, { shallow }) => {
        console.log(
          `App has changed to ${url} ${
            shallow ? 'with' : 'without'
          } shallow routing`
        )
        document.getElementById('__next').classList.add('loaded');
      }
  
      router.events.on('routeChangeStart', addLoader)
      router.events.on('routeChangeComplete', removeLoader)
  
      // If the component is unmounted, unsubscribe
      // from the event with the `off` method:
      return () => {
        router.events.off('routeChangeStart', addLoader)
        router.events.off('routeChangeComplete', removeLoader)
      }
    }, [])
    const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)
    return getLayout(
      // <>
      //   <Component {...pageProps} />
      // </>
        <Provider store={store}>
            <PersistGate
            loading={null}
            persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
        </Provider>
    )
  }
  
  export default MyApp
