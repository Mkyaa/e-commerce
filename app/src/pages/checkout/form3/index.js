import React, { useEffect } from 'react'

//styles
import styles from './index.module.css'

// react-router-dom
import { Link } from 'react-router-dom'

//this is congraculation page after order
const Form3 = ({ setFormIndex }) => {

  //scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <section id='congraculation-order' className={styles.congratOrderWrapper}>
      <div>
        <h1>Congraculation</h1>
        <p>Your order has been received</p>
        <Link to='/'>
          <span onClick={() => setFormIndex(0)}>Back to home</span>
        </Link>
      </div>
    </section>
  )
}

export default Form3