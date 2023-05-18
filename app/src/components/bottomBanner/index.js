import React from 'react'

// Styles
import styles from './index.module.css'

//react-router-dom
import { Link } from 'react-router-dom'

const BottomBanner = () => {
  return (
    <section id='bottom-banner' className={styles.bottomBanner}>
        <h3>THE CHLOE COLLECTION</h3>
        <h1>The Project Jacket</h1>
        <Link to='/shop' className={styles.bottomBannerLink}>SHOP NOW</Link>
    </section>
  )
}

export default BottomBanner