import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Sidebar from '@/components/sidebar'
import Footer from '@/components/footer'
import NextNProgress from 'nextjs-progressbar';

import { QueryClientProvider, QueryClient } from 'react-query'; 
import { store } from '../redux/store';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import Layout from '@/components/Layout'


// export function reportWebVitals(metric) {
//   console.log(metric);
// }



export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
    <SessionProvider session={session}>
    <NextNProgress color="#9577ff" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
      {/* <Layout> */}
      <Sidebar/>
      <Component {...pageProps} />
      <ToastContainer/>
      {/* </Layout> */}
    </SessionProvider>
    </Provider>
    </QueryClientProvider>
  )
}
