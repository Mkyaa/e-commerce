import React, { useEffect, useState } from 'react'

//styles
import styles from './index.module.css'

//image
import discount from '../../assets/images/discount/discount.jpg.webp'

const Discount = () => {

    //state for the discount timer
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)


    //discount timer
    const discountTimer = () => {
        const discountDate = new Date('2023-05-31 00:00:00').getTime()
        const now = new Date().getTime()
        const distance = discountDate - now
        const daysStr = Math.floor(distance / (1000 * 60 * 60 * 24)) < 10 ? `0${Math.floor(distance / (1000 * 60 * 60 * 24))}` : Math.floor(distance / (1000 * 60 * 60 * 24))
        const hoursStr = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) < 10 ? `0${Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}` : Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutesStr = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) < 10 ? `0${Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))}` : Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const secondsStr = Math.floor((distance % (1000 * 60)) / 1000) < 10 ? `0${Math.floor((distance % (1000 * 60)) / 1000)}` : Math.floor((distance % (1000 * 60)) / 1000)
        setDays(daysStr)
        setHours(hoursStr)
        setMinutes(minutesStr)
        setSeconds(secondsStr)
    }

    //discount timer
    useEffect(() => {
        setInterval(() => {
            discountTimer()
        }, 1000)
    }, [])

    return (
        <section className={styles.discountBox}>
            <div className={styles.discountContent}>
                <img src={discount} alt='discount' className={styles.discountImage} />
                <div className={styles.discountRightBox}>
                    <div className={styles.discountRightBoxTop}>
                        <p>DISCOUNT</p>
                        <h1>Summer 2019</h1>
                        <p>SALE 50%</p>
                        <i></i>
                    </div>
                    <div id='discount-count-box' className={styles.countBox} >
                        <h3>{days}</h3>
                        <p>Days</p>
                        <h3>{hours}</h3>
                        <p>Hours</p>
                        <h3>{minutes}</h3>
                        <p>Min</p>
                        <h3>{seconds}</h3>
                        <p>Sec</p>
                    </div>
                    <button>Shop Now</button>
                </div>
            </div>
        </section>
    )
}

export default Discount