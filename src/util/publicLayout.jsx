import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const PublicLayout = ({children}) => {
  return (
    <>
     <Navbar />
     {children}
     <Footer/> 
    </>
  )
}

export default PublicLayout
