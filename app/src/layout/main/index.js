import React, { useEffect } from 'react'

//styles
import styles from './index.module.css'

// react-router-dom  
import { Outlet } from 'react-router-dom'

// Components
import Footer from '../footer';

const Main = () => {

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.mainContainer}>
        <Outlet />
        <Footer />
    </main>
  )
}

export default Main