import React, { useEffect, useState } from 'react'

// Styles
import styles from './index.module.css'

// Components
import Navbar from '../../components/navbar'

// React Router
import { Link } from 'react-router-dom'

// Font Awesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faClipboard } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

// Context
import { useSite } from '../../context/SiteContext'
import { useAuth } from '../../context/AuthContext'

// Components
import ShowDetails from '../../components/showDetails'

const Header = () => {

  // Context state
  const { burger, setBurger,
    openFavorites, setOpenFavorites,
    openCart, setOpenCart,
    favorites, cart
  } = useSite()

  // isLogged
  const { setUser, isLogged, setIsLogged } = useAuth()

  // State
  const [favoritesLength, setFavoritesLength] = useState(0)
  const [cartLength, setCartLength] = useState(0)
  const [userObj, setUserObj] = useState(null)

  // Burger menu
  const burgerMenu = () => {
    setBurger(!burger)
  }

  // Local storage
  const favs = JSON.parse(localStorage.getItem('favs'))
  const cartItem = JSON.parse(localStorage.getItem('cart'))
  useEffect(() => {
    setFavoritesLength(favs.length)
    setCartLength(cartItem.length)
  }, [favs, cartItem])

  //Show Details
  const showDetails = (str) => {
    if (str === 'favorites') {
      setOpenFavorites(!openFavorites)
    } else if (str === 'cart') {
      setOpenCart(!openCart)
    }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('user')
    setIsLogged(false)
    setUser(null)
  }

  // User object
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    setUserObj(user)
  }, [isLogged])

  return (
    <header className={styles.headerWrapper}>
      {openFavorites && <ShowDetails data={favorites} />}
      {openCart && <ShowDetails data={cart} />}
      <Link to='/' >
        <h1 className={styles.headerLogo}>Logo</h1>
      </Link>
      <div id='menu' className={styles.menuBox}>
        <nav id='navbar' className={styles.navbar}>
          <ul>
            <Navbar />
          </ul>
        </nav>
        <div className={styles.headerRightBox}>
          <div className={styles.loginBox}>
            {
              isLogged ?
                <>
                  <p>Welcome, {
                    userObj && userObj.name
                  }</p>
                  |
                  <p onClick={logout} className={styles.logout}>Logout</p>
                </>
                : <>
                  <Link to='/login'>Login</Link>/
                  <Link to='/signUp'>Sign Up</Link>
                </>
            }
          </div>
          <div id='font-container' className={styles.formContainer}>
            <div>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <div className={styles.favoriteBox} onClick={() => showDetails('favorites')} >
              <p className={`${favoritesLength && favoritesLength > 0 ? 'lg:visible' : 'invisible'}`}>
                {favoritesLength && favoritesLength > 0 ? favoritesLength : '0'}
              </p>
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className={styles.cartBox} onClick={() => showDetails('cart')}>
              <p className={`${cartLength && cartLength > 0 ? 'lg:visible' : 'invisible'}`}>
                {cartLength && cartLength > 0 ? cartLength : '0'}
              </p>
              <FontAwesomeIcon icon={faClipboard} />
            </div>
          </div>
        </div>
      </div>


      {/* burger menu font */}
      <FontAwesomeIcon icon={faBars} onClick={burgerMenu} className={styles.burgerIcon} />

      {/* burger menu */}

      <div id='burger-menu' className={`${burger ? 'visible opacity-100' : 'invisible opacity-0'} ${styles.burgerMenu} `} >
        <FontAwesomeIcon icon={faXmark} onClick={burgerMenu} />
        <nav id='burger-navbar' className={styles.burgerNav}>
          <ul>
            <Navbar />
          </ul>
        </nav>
        <div className={styles.burgerNavBottom}>
          <div className={styles.burgerLogin}>
            {
              isLogged ?
                <>
                  <p>Welcome, {
                    userObj && userObj.name
                  }</p>
                  <p onClick={logout} className='cursor-pointer hover:text-gray-600'>Logout</p>
                </>
                : <>
                  <Link to='/login'>Login</Link>
                  <Link to='/signUp'>Sign Up</Link>
                </>
            }
          </div>
          <div className={styles.burgerFontBox}>
            <div>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <div className={styles.favoriteBox} onClick={() => showDetails('favorites')}>
              <p className={`${favoritesLength && favoritesLength > 0 ? 'visible' : 'invisible'} ` }>
                {favoritesLength && favoritesLength > 0 ? favoritesLength : '0'}
              </p>
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className={styles.cartBox} onClick={() => showDetails('cart')}>
              <p className={`${cartLength && cartLength > 0 ? 'visible' : 'invisible'} ` }>
                {cartLength && cartLength > 0 ? cartLength : '0'}
              </p>
              <FontAwesomeIcon icon={faClipboard} />
            </div>
          </div>
        </div>
      </div>
    </header >
  )
}

export default Header