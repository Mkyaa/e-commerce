import React, { useEffect, useState } from 'react'

// styles
import styles from './index.module.css'

//context
import { useSite } from '../../../context/SiteContext'

//components
import CartList from './cartList'

//data
import couponCode from '../../../data/couponCode'

//react router dom
import { Link } from 'react-router-dom'

const Form1 = ({ nextForm, total, setTotal, subTotal, setSubTotal }) => {

    //context state
    const { cart } = useSite()

    //state
    const [couponRate, setCouponRate] = useState('No Apply')

    //cart list 
    const cartList = cart.map((item, index) => {
        return <CartList key={index} item={item} />
    })

    //subtotal
    useEffect(() => {
        const subTotal = cart.reduce((acc, item) => {
            return acc + item.price * item.quantity
        }, 0)
        setSubTotal(subTotal.toFixed(2))
    }, [cart, setSubTotal])

    //discount coupon code
    const applyCoupon = () => {
        const couponInput = document.querySelector('#coupon-input')
        const coupon = couponInput.value
        const couponObj = couponCode.find(item => item.code === coupon)
        if (couponObj) {
            setCouponRate(couponObj.discount)
            alert('Coupon code applied')
        }
        else {
            setCouponRate('No Apply')
            alert('Coupon code not found')
        }
    }

    //total price after discount
    useEffect(() => {
        if (couponRate !== 'No Apply') {
            const total = subTotal - (subTotal * couponRate / 100)
            setTotal(total.toFixed(2))
        }
        else {
            setTotal(subTotal)
        }
    }, [couponRate, subTotal, setTotal])

    return (
        <div id='checkout-content' className={styles.checkOutContent}>
            <div id='checkout-table'>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            cart && cart.length > 0
                                ? cartList
                                : <tr>
                                    <td className='text-center py-10 text-xl' colSpan='4'>No items</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div id='checkout-checking' className={styles.checkOutCheck}>
                <div id='checking-left' className={styles.checkLeft}>
                    <span className={styles.backShop}>
                        <Link to='/shop'>CONTINUE SHOPPING</Link>
                    </span>
                    <div className={styles.discountBox}>
                        <h1>DISCOUNT CODES</h1>
                        <div className={styles.discountInputBox}>
                            <input id='coupon-input' type='text' placeholder='Enter your coupon code'/>
                            <button onClick={applyCoupon}>APPLY</button>
                        </div>
                    </div>
                </div>
                <div id='checking-right' className={styles.checkRight}>
                    <h1>CART TOTALS</h1>
                    <div className={styles.checkGroup}>
                        <span>Subtotal</span>
                        <p>${subTotal}</p>
                    </div>
                    <div className={styles.checkGroup}>
                        <span>Coupon</span>
                        <p>{couponRate !== 'No Apply' ? '%' + couponRate : couponRate}</p>
                    </div>
                    <div className={styles.checkGroup}>
                        <span>Total</span>
                        <p>${total}</p>
                    </div>
                    <button className={styles.nextStep} onClick={nextForm}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    )
}

export default Form1