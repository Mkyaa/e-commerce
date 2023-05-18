import React from 'react'

// Styles
import styles from './index.module.css'

// react-router-dom
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  //navbar active style
  const activeStyle = ({ isActive }) => isActive ? styles.activeLink : ''

  return (
    <>
      <li className={styles.navbarMenu} >
        <NavLink className={activeStyle} to='/'>HOME</NavLink>
      </li>
      <li className={styles.navbarMenu} >
        <NavLink className={activeStyle} to='/womens'>WOMEN'S</NavLink>
      </li>
      <li className={styles.navbarMenu} >
        <NavLink className={activeStyle} to='/mens'>MEN'S</NavLink>
      </li>
      <li className={styles.navbarMenu} >
        <NavLink className={activeStyle} to='/shop'>SHOP</NavLink>
      </li>
      <li className={styles.navbarMenu} >
        <NavLink className={activeStyle} to='/contact'>CONTACT</NavLink>
      </li>
    </>
  )
}

export default Navbar