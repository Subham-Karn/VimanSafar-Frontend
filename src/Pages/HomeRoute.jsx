import React from 'react'
import TravelSection from '../Components/TravelSection'
import HeroSection from '../Components/Hero'
import ReasonsToBook from '../Components/ReasonsToBook'
import ExcitingOffers from '../Components/ExcitingOffers'
import ExclusiveDeals from '../Components/ExclusiveDeals'
import PaymentMode from '../Components/PaymentMethos'
import VimaanSafarReviews from '../Components/VimaanSafarReviews'

const HomeRoute = () => {
  return (
    <div>
      <HeroSection />
      <ReasonsToBook />
      <ExcitingOffers />
      <ExclusiveDeals/>
      <VimaanSafarReviews/>
      <PaymentMode/>
    </div>
  )
}

export default HomeRoute
