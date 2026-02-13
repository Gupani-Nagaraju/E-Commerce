import React from 'react'
import HeroBanner from '../../Components/Herobaanner/HeroBanner'
import Categorygrid from '../../Components/Category/Categorygrid'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Navbar/Header'


const Landpage = () => {
  return (
    <div>
          <Header/>
         <HeroBanner/>
          <Categorygrid/>
          <Footer/>
    </div>
  )
}

export default Landpage
