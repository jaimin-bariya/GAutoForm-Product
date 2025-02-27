import { useState } from 'react'
import AppRouters from './routers/AppRouters'
import { ThemeProvider } from '@contexts/ThemeContext'

import './App.css'
import { FileDetailsContextProvider } from './contexts/FileContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <FileDetailsContextProvider>
      <AppRouters/>
      </FileDetailsContextProvider>
      </ThemeProvider>

    </>
  )
}

export default App
