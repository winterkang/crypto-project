import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import { ThemeProvider } from 'styled-components'
// import { theme } from './theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {/* <ThemeProvider theme={theme}> */}
        <App />
        {/* </ThemeProvider> */}
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
)
