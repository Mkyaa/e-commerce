import React, { useEffect, useState } from 'react'

//context
import { useSite } from '../../context/SiteContext'

//icons from fontawesome
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//styles
import styles from './index.module.css'
import ShowList from './components/showList'
import { Link } from 'react-router-dom'

function ShowDetails({ data }) {

    //context state
    const { openFavorites, setOpenFavorites, openCart, setOpenCart,
        closeCart, closeBurger, allRemoveFavorites, allRemoveCart
    } = useSite()
    const { setFavorites, cart, setCart } = useSite()

    //state
    const [totalPrice, setTotalPrice] = useState(0)

    // Close details
    const closeDetails = () => {
        if (openFavorites) {
            setOpenFavorites(!openFavorites)
        } else if (openCart) {
            setOpenCart(!openCart)
        }
    }

    // All add to cart with quantity
    const allAddToCart = () => {
        const updatedCart = []
        data.forEach(item => {
            const productIsInCart = cart.find((cartItem) => cartItem.id === item.id)
            if (!productIsInCart) {
                const updatedItem = { ...item, quantity: 1 }
                updatedCart.push(updatedItem)
            }
        })
        const allCart = [...cart, ...updatedCart]
        localStorage.setItem('cart', JSON.stringify(allCart))
        setCart(allCart)
    }

    // Total price
    useEffect(() => {
        let total = 0
        cart.forEach(item => {
            total += item.price * item.quantity
        })
        setTotalPrice(total)
    }, [cart])

    return (
        <div className={styles.favoritesCard}>
            <FontAwesomeIcon icon={faAnglesRight} className={styles.closeButton} onClick={closeDetails} />
            <h1 className={styles.favoriteTitle}>{openFavorites ? 'Favorites' : 'Cart'}</h1>
            <div className={styles.favoritesContent}>
                <div className={styles.favContainer}>
                    {data && data.length > 0
                        ? data.map(item => {
                            return <ShowList item={item} openCart={openCart} />
                        })
                        : <p>No items</p>
                    }
                </div>
            </div>
            <div className={styles.favoritesFooter}>
                <p className='w-full bg-orange-500 text-white'
                    onClick={openFavorites
                        ? allAddToCart
                        : () => {
                            closeCart()
                            closeBurger()
                        }}
                >
                    {openFavorites ? 'All add to cart' : <Link className='w-full h-full pt-3 text-center' to='/checkout'>Confirm cart   (Total: ${totalPrice})</Link>}
                </p>
                <p onClick={
                    openFavorites ? allRemoveFavorites : allRemoveCart
                } >Clear all</p>
            </div>
        </div>
    )
}

export default ShowDetails