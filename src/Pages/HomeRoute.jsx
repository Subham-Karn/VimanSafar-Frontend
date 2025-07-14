import React from 'react'
import HeroSection from '../Components/Home/Hero'
import ReasonsToBook from '../Components/Home/ReasonsToBook'
import ExcitingOffers from '../Components/Home/ExcitingOffers'
import ExclusiveDeals from '../Components/Home/ExclusiveDeals'
import PaymentMode from '../Components/Home/PaymentMethos'
import VimaanSafarReviews from '../Components/Home/VimaanSafarReviews'

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
