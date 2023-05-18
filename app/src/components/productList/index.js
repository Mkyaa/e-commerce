import React, { useEffect, useState } from 'react'

// Components
import ImageList from './components/imageList'

//styles
import styles from './index.module.css'

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons'
import { faClipboard, faHeart } from '@fortawesome/free-regular-svg-icons'

// Context
import { Link } from 'react-router-dom'
import { useSite } from '../../context/SiteContext'

const ProductList = ({ data }) => {

    //state
    const [imgIndex, setImgIndex] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [isInCart, setIsInCart] = useState(false)

    //context state
    const { favorites, setFavorites } = useSite()
    const { cart, setCart } = useSite()

    //destructuring
    const { id, title, price, rating, images } = data

    //images list
    const imagesList = images.map((image, index) => {
        return <ImageList id={id} key={index} image={image} index={index} setImgIndex={setImgIndex} />
    })

    //rating stars
    const ratingStars = []
    const ratingLength = Math.round(rating)
    for (let i = 0; i < ratingLength; i++) {
        ratingStars.push(<FontAwesomeIcon icon={faStar} key={i} className='text-yellow-500' />)
    }

    //check if the item is in the favorites and cart
    useEffect(() => {
        const productIsFavorite = favorites.find((favorite) => favorite.id === id)
        setIsFavorite(productIsFavorite ? true : false)
        const productIsInCart = cart.find((cartItem) => cartItem.id === id)
        setIsInCart(productIsInCart ? true : false)
    }, [favorites, id, cart])

    // Toggle favorite
    const toggleFavorite = () => {
        const productIsFavorite = favorites.find((favorite) => favorite.id === id);
        if (productIsFavorite) {
            const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
            localStorage.setItem('favs', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
            setIsFavorite(false);
        } else {
            const updatedFavorites = [...favorites, data];
            localStorage.setItem('favs', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
            setIsFavorite(true);
        }
    }

    // Toggle cart with quantity
    const toggleCart = () => {
        const productIsInCart = cart.find((cartItem) => cartItem.id === id);
        if (productIsInCart) {
            const updatedCart = cart.filter((cartItem) => cartItem.id !== id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);
            setIsInCart(false);
        } else {
            const updatedCart = [...cart, { ...data, quantity: 1 }];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);
            setIsInCart(true);
        }
    }

    return (
        <div id={`productBox-${id}`} className={styles.newProductCard} >
            <div className={styles.imagebox}>
                <img src={data && images[imgIndex]} alt={title} className={styles.imageBoxImg} />
                <div id={`images-box-${id}`} className={styles.imageListBox}>
                    {imagesList}
                </div>
            </div>
            <div >
                <h1 className={styles.cardTitle}>{title}</h1>
                <div className={styles.cardExp}>
                    {
                        rating > 0 ?
                            <div className='flex justify-center'>
                                {ratingStars}
                                <p className='ml-2 text-gray-600'>{rating.toFixed(2)}</p>
                            </div>
                            :
                            <div className='flex justify-center'>
                                <p className='text-center'>No rating yet</p>
                            </div>
                    }
                </div>
                <p className={styles.cardPrice}>${price}</p>
            </div>
            <div className={styles.fontBox}>
                <Link to={`shop/product/${id}`} className={styles.fontContent}>
                    <FontAwesomeIcon
                        icon={faUpRightAndDownLeftFromCenter}
                        className={styles.fontBoxSvg}
                    />
                </Link>
                <FontAwesomeIcon
                    id={`favoriteBtn-${id}`}
                    icon={faHeart}
                    onClick={toggleFavorite}
                    className={styles.fontBoxSvg + ' ' + (isFavorite ? 'bg-red-600 text-white' : '')}
                />
                <FontAwesomeIcon
                    icon={faClipboard}
                    onClick={toggleCart}
                    className={styles.fontBoxSvg + ' ' + (isInCart ? 'bg-red-600 text-white' : '')}
                />
            </div>
        </div >
    )
}

export default ProductList