import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../util/publicLayout'
import HomeRoute from '../Pages/HomeRoute'
import FlightSearchResults from '../Pages/Travel-Routes/FlightRoute'
import TrainSearchResults from '../Pages/Travel-Routes/TrainsRoute'
import BusSearchResults from '../Pages/Travel-Routes/BusRoute'
import PackagesResults from '../Pages/Package-Routes/PackageRoute'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from '../Admin/AdminRoute'
import FlightRoute from '../Transport-Components/FlightRoute'
import TrainRoute from '../Transport-Components/TrainRoute'
import BusRoute from '../Transport-Components/BusRoute'
import ErrorBoundary from '../Components/Home/ErrorBoundary'
import PackageTickets from '../Mondals/Packages/PackageTickets'
// Package Routes
import BookedPackages from '../Pages/Package-Routes/PackageBookingList'
const MainRoute = () => {
  return (
    <ErrorBoundary>
    <Routes>
      <Route path='/' element={<PublicLayout><HomeRoute /></PublicLayout>} />

      {/* Flight Routes */}
      <Route path='/flights' element={<PublicLayout><FlightRoute /></PublicLayout>} />
      <Route path='/flights/search' element={<PublicLayout><FlightSearchResults /></PublicLayout>} />'
      
      {/* Train Routes */}
      <Route path='/trains' element={<PublicLayout><TrainRoute /></PublicLayout>} />
      <Route path='/trains/search' element={<PublicLayout><TrainSearchResults /></PublicLayout>} />

      {/* Bus Routes */}
      <Route path='/bus' element={<PublicLayout><BusRoute /></PublicLayout>} />
      <Route path='/bus/search' element={<PublicLayout><BusSearchResults /></PublicLayout>} />

      {/* Package Routes */}
      <Route path='/packages' element={<PublicLayout><PackagesResults /></PublicLayout>} />
      <Route path='/mypackages' element={<PublicLayout><PackageTickets /></PublicLayout>} />
      <Route path='/mypackage/bookings' element={<PublicLayout><BookedPackages /></PublicLayout>} />

      {/* Admin Routes */}
      <Route path='/admin/*' element={<ProtectedRoute allowRoles={['admin']}><AdminRoute /></ProtectedRoute>} />
    </Routes>
    </ErrorBoundary>
  )
}

export default MainRoute
