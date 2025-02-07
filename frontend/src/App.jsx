import { useState } from 'react'
import AppRouters from './routers/AppRouters'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <AppRouters/>

    </>
  )
}

export default App
