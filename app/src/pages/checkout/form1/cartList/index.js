import React, { useEffect, useState } from 'react'

// styles
import styles from './index.module.css'

//fontawesome
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//context
import { useSite } from '../../../../context/SiteContext'


const CartList = ({ item }) => {

    //destructuring
    const { id, title, images, price, rating } = item

    //state
    const [quantity, setQuantity] = useState(1)

    //context state
    const { setCart } = useSite()


    //rating stars
    const ratingStars = []
    const ratingLength = Math.round(rating)
    for (let i = 0; i < ratingLength; i++) {
        ratingStars.push(<FontAwesomeIcon icon={faStar} key={i} className='text-yellow-500' />)
    }


    //get quantity from local storage
    useEffect(() => {
        const cartItem = JSON.parse(localStorage.getItem('cart'))
        const productIsInCart = cartItem.find((cartItem) => cartItem.id === id)
        if (productIsInCart) {
            setQuantity(productIsInCart.quantity)
        }
    }, [id])


    //add quantity 
    const addQuantity = () => {
        const cartItem = JSON.parse(localStorage.getItem('cart'))
        const productIsInCart = cartItem.find((cartItem) => cartItem.id === id)
        if (productIsInCart) {
            const updatedCart = cartItem.map((cartItem) => {
                if (cartItem.id === id) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 }
                }
                return cartItem
            })
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            setCart(updatedCart)
        }
        setQuantity(quantity + 1)
    }

    //remove quantity
    const removeQuantity = () => {
        if (quantity > 1) {
            const cartItem = JSON.parse(localStorage.getItem('cart'))
            const productIsInCart = cartItem.find((cartItem) => cartItem.id === id)
            if (productIsInCart) {
                const updatedCart = cartItem.map((cartItem) => {
                    if (cartItem.id === id) {
                        return { ...cartItem, quantity: cartItem.quantity - 1 }
                    }
                    return cartItem
                })
                localStorage.setItem('cart', JSON.stringify(updatedCart))
                setCart(updatedCart)
            }
            setQuantity(quantity - 1)
        }
    }

    //remove item
    const removeItem = () => {
        const cartItem = JSON.parse(localStorage.getItem('cart'))
        const updatedCart = cartItem.filter((cartItem) => cartItem.id !== id)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCart(updatedCart)
    }

    return (
        <tr className={styles.cartListBox}>
            <td className={styles.cartListLeft}>
                <img src={images[0]} alt={id} />
                <div className={styles.cartListExp}>
                    <span>{title}</span>
                    <p >{ratingStars}</p>
                </div>
            </td>
            <td className={styles.cartListPrice}>${price}</td>
            <td>
                <div className={styles.cartListQuantityBox}>
                    <button onClick={removeQuantity}>-</button>
                    <p>{quantity}</p>
                    <button onClick={addQuantity}>+</button>
                </div>
            </td>
            <td className={styles.cartListPrice}>${price * quantity}</td>
            <td>
                <button className={styles.cartListRemove} onClick={removeItem}>x</button>
            </td>
        </tr>
    )
}

export default CartList