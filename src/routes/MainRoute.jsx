import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../util/publicLayout'
import HomeRoute from '../Pages/HomeRoute'
const MainRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<PublicLayout><HomeRoute /></PublicLayout>} />
    </Routes>
  )
}

export default MainRoute
