import React, { useEffect, useState } from 'react'

//styles
import styles from './index.module.css'

// Axios
import axios from 'axios'

// React Spinner
import ClipLoader from 'react-spinners/ClipLoader'

// Components
import ProductList from '../../components/productList'

const Shop = ({ categories }) => {

  // state for products
  const [products, setProducts] = useState()
  const [activeBtn, setActiveBtn] = useState()

  // first list of page
  useEffect(() => {
    const getProducts = async () => {
      const firstCategory = categories[0].toLowerCase().replace(/'/g, '').replace(/ /g, '-')
      const response = await axios.get(process.env.REACT_APP_SINGLE_CATEGORIES + firstCategory)
      setProducts(response.data.products)
    }
    getProducts()
  }, [categories])

  //catch the url
  const url = window.location.pathname.replace('/', '')

  // set active button
  useEffect(() => {
    if (url === 'shop') {
      setActiveBtn(categories[0])
    }
    else if (url === 'womens') {
      setActiveBtn(categories[0])
    }
    else if (url === 'mens') {
      setActiveBtn(categories[0])
    }
  }, [url, categories])

  // change active button
  useEffect(() => {
    const buttons = document.querySelectorAll('#womens-left-filter li')
    buttons.forEach(btn => {
      btn.innerHTML === activeBtn
        ? btn.classList.add('text-orange-500')
        : btn.classList.remove('text-orange-500')
    })
  }, [activeBtn])

  // get products from api
  const getProducts = async (e) => {
    const value = e.target.innerText
    const categoryForApi = value.toLowerCase().replace(/'/g, '').replace(/ /g, '-')
    const response = await axios.get(process.env.REACT_APP_SINGLE_CATEGORIES + categoryForApi)
    setProducts(response.data.products)
    setActiveBtn(value)
  }

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className={styles.shopContainer}>
      <div id='shop-content' className={styles.shopContent}>
        <div id='left-filter' className={styles.shopContentLeft}>
          <h1>CATEGORIES<i></i></h1>
          <ul>
            {categories.map((category, index) => {
              return (
                <li key={index} onClick={getProducts} className={`
               ${index !== categories.length - 1 ? ' border-b-[1px] border-solid pb-2' : ''} 
               ${category === activeBtn ? 'text-orange-500' : ''}
               cursor-pointer font-medium text-gray-800`}>{category}</li>
              )
            })}
          </ul>
          <div className={styles.shopfilter}>
            <h1>SHOP BY PRICE<i></i></h1>
            <div>
              <input type='number' placeholder='Min'/>
              <p>_</p>
              <input type='number' placeholder='Max'/>
            </div>
          </div>
        </div>
        <div id='right-products' className={styles.shopContentRight}>
          {
            products && products.length > 0
              ? products.map((product, index) => {
                return <ProductList data={product} key={index} />
              })
              : <ClipLoader color="#EF4444" />
          }
        </div>
      </div>
    </div>
  )
}


export default Shop