import React, { useEffect, useState } from 'react'

//styles
import styles from './index.module.css'

//axios
import axios from 'axios'

//react router dom
import { useParams } from 'react-router-dom'

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

//context
import { useSite } from '../../context/SiteContext'

const ProductDetails = () => {

    //state for the product
    const [product, setProduct] = useState()
    const [imgIndex, setImgIndex] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const { favorites, setFavorites, cart, setCart } = useSite()

    //catch the id from the url
    const id = useParams().id

    //fetch the product with the id
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(process.env.REACT_APP_SINGLE_PRODUCT + id)
            setProduct(response.data)
        }
        fetchProduct()
    }, [id, favorites])

    //rating stars
    const ratingStars = []
    const ratingLength = Math.round(product && product.rating)
    for (let i = 0; i < ratingLength; i++) {
        ratingStars.push(<FontAwesomeIcon icon={faStar} key={i} className='text-yellow-500' />)
    }

    //images index
    const getIndex = (e) => {
        const index = e.target.id.slice(-1)
        setImgIndex(index)
        const images = document.querySelectorAll('#detail-images-list img')
        images.forEach(i => {
            i.classList.remove('opacity-40')
            i.classList.add('opacity-40')
        }
        )
        images[index].classList.remove('opacity-40')
        images[index].classList.add('opacity-100')
    }

    //check favorite 
    useEffect(() => {
        const id= product && product.id
        const productIsFavorite = favorites.find((favorite) => favorite.id === id)
        if (productIsFavorite) {
            setIsFavorite(true)
        }
        else {
            setIsFavorite(false)
        }
    }, [favorites, product])


    //toggle favorite
    const toggleFavorite = () => {
        const id = product.id
        const productIsFavorite = favorites.find((favorite) => favorite.id === id)
        if (productIsFavorite) {
            const updatedFavorites = favorites.filter((favorite) => favorite.id !== id)
            localStorage.setItem('favs', JSON.stringify(updatedFavorites))
            setFavorites(updatedFavorites)
            setIsFavorite(false)
        }
        else {
            const updatedFavorites = [...favorites, product]
            localStorage.setItem('favs', JSON.stringify(updatedFavorites))
            setFavorites(updatedFavorites)
            setIsFavorite(true)
    }
    }

    //add cart with quantity
    const addCart = () => {
        const id = product.id
        const productIsInCart = cart.find((cartItem) => cartItem.id === id)
        if(productIsInCart){
            const updatedCart = cart.filter((cartItem) => cartItem.id !== id)
            productIsInCart.quantity += quantity
            const newCart = [...updatedCart, productIsInCart]
            localStorage.setItem('cart', JSON.stringify(newCart))
            setCart(newCart)
        }else{
            const updatedCart = [...cart, { ...product, quantity: quantity }]
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            setCart(updatedCart)
        }
    }

    //add quantity
    const addQuantity = () => {
        setQuantity(quantity + 1)
    }

    //remove quantity
    const removeQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])
    
    

    return (
        <section id='product-details-container' className={styles.productDetailContainer}>
            <div className={styles.productDetailContent}>
                <div className={styles.topBox}>
                    <div id='left-side' className={styles.topLeftSide}>
                        <div id='detail-images-list' className={styles.imageList}>
                            {
                                product && product.images.map((image, index) => {
                                    return <div className={styles.imageBox} onClick={getIndex} key={index}>
                                        {
                                            index === 0
                                                ? <img id={`detail-images-${index}`} src={image} alt={product.title} key={index} className='opacity-100' />
                                                : <img id={`detail-images-${index}`} src={image} alt={product.title} key={index} className='opacity-40' />
                                        }
                                    </div>
                                })
                            }
                        </div>
                        <div className={styles.showImgBox}>
                            <img src={product && product.images[imgIndex]} alt={product && product.title}/>
                        </div>
                    </div>
                    <div id='right-side' className={styles.topRightSide}>
                        <h1 className={styles.productTitle}>{product && product.title}</h1>
                        <p className={styles.productBrand}>{product && product.brand}</p>
                        {
                            product && product.rating > 0 ?
                                <div className={styles.productRateBox}>
                                    {ratingStars}
                                    <p>{product.rating.toFixed(2)}</p>
                                </div>
                                :
                                <div className={styles.productNoRate}>
                                    <p>No rating yet</p>
                                </div>
                        }
                        <div className={styles.productPriceBox}>
                            <h1>${product && product.price}</h1>
                            <h3>${product && product.price + product.price * (product.discountPercentage / 100).toFixed(2)}</h3>
                        </div>
                        <p className={styles.productDesc}>{product && product.description}</p>
                        <div className={styles.productInteractBox}>
                            <p>Quantity:</p>
                            <div className={styles.productQuantityBox}>
                                <span onClick={removeQuantity} >-</span>
                                <input type='text' value={quantity} />
                                <span onClick={addQuantity}>+</span>
                            </div>
                            <button className={styles.productAddBtn} onClick={addCart}>Add to cart</button>
                            <FontAwesomeIcon 
                            icon={faHeart} 
                            className={`${isFavorite ? 'text-red-600' : ''} ${styles.productAddFav}`}
                            onClick={toggleFavorite}
                            />
                        </div>
                        <div className={styles.productAvbBox}>
                            <p>Availability:</p>
                            <span>{product && product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.bottomBox}>
                    <div className={styles.bottomTitleBox}>
                        <h3>Description</h3>
                    </div>
                    <div className={styles.bottomExpBox}>
                        <h3>Description</h3>
                        {
                            product && product.description && <p>{product.description}</p>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetails