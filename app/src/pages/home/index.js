import React, { useEffect } from 'react'

//styles
import styles from './index.module.css'

//components
import HomeCategories from '../../components/homeCategories'
import NewProduct from '../../components/newProduct'
import BottomBanner from '../../components/bottomBanner'
import Discount from '../../components/discount'

const Home = () => {

  //scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className={styles.homeContainer}>
      <HomeCategories />
      <NewProduct />
      <BottomBanner />
      <Discount />
    </div>
  )
}

export default Home