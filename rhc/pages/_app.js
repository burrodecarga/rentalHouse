// importing bootswatch
import 'bootswatch/dist/cosmo/bootstrap.min.css'
import 'animate.css/animate.min.css'
import '../global.css'
import {QueryClient,QueryClientProvider} from 'react-query'

// This default export is required in a new `pages/_app.js` file.

const  queryClient = new QueryClient()
export default function MyApp({ Component, pageProps }) {
     return  (
     <QueryClientProvider client ={queryClient}>
            <Component {...pageProps} />
     </QueryClientProvider>)
}