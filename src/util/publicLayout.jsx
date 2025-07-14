import React from 'react'
import Navbar from '../Components/Home/Navbar'
import Footer from '../Components/Home/Footer'

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
