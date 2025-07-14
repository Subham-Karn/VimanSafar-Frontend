import React from 'react'
import MainRoute from './routes/MainRoute'
import { Router } from 'react-router-dom'
import { TravelProvider } from './context/TravelContext'
import { AuthProvider } from './context/AuthContext'
import { PackageProvider } from './context/PackageContext'

const App = () => {
  return (
    <div>
      
      <PackageProvider>
      <TravelProvider>
        <AuthProvider>
          <MainRoute />
        </AuthProvider>
      </TravelProvider>
      </PackageProvider>
    </div>
  )
}

export default App
