import React, { useEffect, useState } from 'react'

// styles
import styles from './index.module.css'

// components
import Form1 from './form1'
import Form2 from './form2'
import Form3 from './form3'

// context
import { useSite } from '../../context/SiteContext'

const CheckOut = () => {

  //state
  const [total, setTotal] = useState('0.00')
  const [formIndex, setFormIndex] = useState(0)
  const [subTotal, setSubTotal] = useState('0.00')

  //context state
  const { cart } = useSite()

  //next form
  const nextForm = () => {
    if(cart.length > 0){ 
      setFormIndex(formIndex + 1)
    }
    else{
      alert('Please add product to cart')
    }
  }

  //scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


  return (
    <section id='checkout-container' className={styles.checkOutWrapper}>
      {
        formIndex === 0 && <Form1 nextForm={nextForm} total={total} setTotal={setTotal} subTotal={subTotal} setSubTotal={setSubTotal} />
      }
      {
        
        formIndex === 1 && <Form2 nextForm={nextForm} total={total}/>
      }
      {
        formIndex === 2 && <Form3 setFormIndex={setFormIndex} />
      }

    </section>
  )
}

export default CheckOut