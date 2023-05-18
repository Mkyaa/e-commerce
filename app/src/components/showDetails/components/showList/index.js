import React, { useEffect, useState } from 'react'

//styles
import styles from './index.module.css'

//icons from fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faClipboard, faTrashCan, faHeart } from '@fortawesome/free-regular-svg-icons'

//react router dom
import { Link } from 'react-router-dom'

//context
import { useSite } from '../../../../context/SiteContext'

const ShowList = ({ item, openCart }) => {

    //state
    const [quantity, setQuantity] = useState()
    const [price, setPrice] = useState()

    //context state
    const { favorites, setFavorites, cart, setCart, closeFavorites, closeCart, closeBurger} = useSite()

    //check if the item is in the favorites 
    const [isFavorite, setIsFavorite] = useState(false)
    const [isInCart, setIsInCart] = useState(false)

    //check if the item is in the favorites and cart and set quantity and price
    useEffect(() => {
        const productIsFavorite = favorites.find((favorite) => favorite.id === item.id)
        setIsFavorite(productIsFavorite ? true : false)
        const productIsInCart = cart.find((cartItem) => cartItem.id === item.id)
        setIsInCart(productIsInCart ? true : false)
        const productQuantity = cart.find((cartItem) => cartItem.id === item.id)
        setQuantity(productQuantity ? productQuantity.quantity : 1)
        setPrice(productQuantity ? productQuantity.quantity * item.price : item.price)
    }, [favorites, item.id, cart, item.price])

    //toggle favorite
    const toggleFavorite = () => {
        const productIsFavorite = favorites.find((favorite) => favorite.id === item.id)
        if (productIsFavorite) {
            const updatedFavorites = favorites.filter((favorite) => favorite.id !== item.id)
            localStorage.setItem('favs', JSON.stringify(updatedFavorites))
            setFavorites(updatedFavorites)
            setIsFavorite(false)
        } else {
            const updatedFavorites = [...favorites, item]
            localStorage.setItem('favs', JSON.stringify(updatedFavorites))
            setFavorites(updatedFavorites)
            setIsFavorite(true)
        }
    }

    //toggle cart with quantity
    const toggleCart = () => {
        const productIsInCart = cart.find((cartItem) => cartItem.id === item.id)
        if (productIsInCart) {
            const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id)
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            setCart(updatedCart)
            setIsInCart(false)
        } else {
            const updatedCart = [...cart, { ...item, quantity: 1 }]
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            setCart(updatedCart)
            setIsInCart(true)
        }
    }

    //remove favorites
    const removeFavorites = (id) => {
        const favorites = JSON.parse(localStorage.getItem('favs'))
        const updatedFavorites = favorites.filter((favorite) => favorite.id !== id)
        localStorage.setItem('favs', JSON.stringify(updatedFavorites))
        setFavorites(updatedFavorites)
    }

    //remove cart
    const removeCart = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))
        const updatedCart = cart.filter((cartItem) => cartItem.id !== id)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCart(updatedCart)
    }

    //add quantity and update price
    const addQuantity = () => {
        const updatedCart = cart.map((cartItem) => {
            if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 }
            }
            return cartItem
        })
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCart(updatedCart)
        setQuantity(quantity + 1)
    }

    //remove quantity and update price
    const removeQuantity = () => {
        if (quantity > 1) {
            const updatedCart = cart.map((cartItem) => {
                if (cartItem.id === item.id) {
                    return { ...cartItem, quantity: cartItem.quantity - 1 }
                }
                return cartItem
            })
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            setCart(updatedCart)
            setQuantity(quantity - 1)
        }
    }

    return (
        <div className={styles.showDetailBox}>
            <div className={styles.showImgBox}>
                <img src={item.images[0]} alt={item.id} />
            </div>
            <div className={styles.showExpBox}>
                <Link to={`shop/shop/product/${item.id}`} onClick={()=>{ 
                    closeCart()
                    closeFavorites()
                    closeBurger()
                }} >{item.title} </Link>
                {
                    openCart
                        ? <p>${price}</p>
                        : <p>${item.price}</p>
                }
            </div>
            {
                openCart && <div className={styles.showQuantityBox}>
                    <FontAwesomeIcon 
                    icon={faMinus} 
                    onClick={removeQuantity}
                    />
                    <p>{quantity}</p>
                    <FontAwesomeIcon 
                    icon={faPlus} 
                    onClick={addQuantity}
                    />
                </div>
            }
            <div className={styles.showFontsBox}>
                {
                    openCart
                        ? <FontAwesomeIcon
                            icon={faHeart}
                            className={`${isFavorite ? 'text-red-600' : ''}`}
                            onClick={toggleFavorite}
                        />
                        : <FontAwesomeIcon
                            icon={faClipboard}
                            className={`${isInCart ? 'text-red-600' : ''}`}
                            onClick={toggleCart}
                        />
                }
                <FontAwesomeIcon
                    icon={faTrashCan}
                    onClick={openCart ? () => removeCart(item.id) : () => removeFavorites(item.id)}
                />
            </div>

        </div>
    )
}

export default ShowList