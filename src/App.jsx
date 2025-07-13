import React from 'react'
import MainRoute from './routes/MainRoute'
import { Router } from 'react-router-dom'
import { TravelProvider } from './context/TravelContext'

const App = () => {
  return (
    <div>
      <TravelProvider>
          <MainRoute />
      </TravelProvider>
    </div>
  )
}

export default App
