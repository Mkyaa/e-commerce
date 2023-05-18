import React, { useEffect, useState } from 'react'

//styles
import styles from './index.module.css'

//context
import { useFetch, useSite } from '../../context/SiteContext'

//react-spinners
import ClipLoader from 'react-spinners/ClipLoader';

//components
import ProductList from '../productList';

const NewProduct = () => {

    //state
    const [filterStr, setFilterStr] = useState('products')
    const [filteredData, setFilteredData] = useState()

    //get allData from context
    const { allData, setAllData } = useSite()

    //fetch all data
    const data = useFetch(process.env.REACT_APP_ALL_PRODUCT)

    //change allData when data is fetched
    useEffect(() => {
        setAllData(data)
    }, [data, setAllData])

    //filter data
    useEffect(() => {
        if (allData) {
            if (filterStr === 'products') {
                setFilteredData(allData)
            }
            else {
                const filtered = allData.filter(data => data.category === filterStr)
                setFilteredData(filtered)
            }
        }
    }, [allData, filterStr])

    //change filter string for filteredData
    const changeFilter = (e) => {
        const id = e.target.id
        const cutIndex = id.indexOf('_')
        const cleanFilterText = id.slice(0, cutIndex)
        setFilterStr(cleanFilterText)
    }

    //change active filter
    useEffect(() => {
        const filter = document.querySelectorAll(`.${styles.ulBox} li`)
        filter.forEach(f => {
            f.classList.remove(styles.activeFilter)
        })
        const activeFilter = document.getElementById(`${filterStr}_home`)
        activeFilter.classList.add(styles.activeFilter)
    }, [filterStr])
    

    return (
        <section id='new-product' className={styles.newProductContainer}>
            <div className={styles.newProBox}>
                <nav className={styles.navBox}>
                    <h1 className={styles.navTitle} >New Product
                        <i className={styles.navTitleBottom}></i>
                    </h1>
                    <ul className={styles.ulBox}>
                        <li id='products_home' onClick={changeFilter} className={styles.activeFilter} >All</li>
                        <li id='laptops_home' onClick={changeFilter}>Laptops</li>
                        <li id='fragrances_home' onClick={changeFilter}>Fragrances</li>
                        <li id='groceries_home' onClick={changeFilter}>Groceries</li>
                        <li id='home-decoration_home' onClick={changeFilter}>Home Decoration</li>
                        <li id='skincare_home' onClick={changeFilter}>Cosmetics</li>
                    </ul>
                </nav>
                <div className={styles.filteredBox}>
                    {
                        filteredData && filteredData.length > 0 ?
                            filteredData.map((data, index) => {
                                return (
                                    <ProductList key={index} data={data} />
                                )
                            })
                            : <ClipLoader color="#EF4444" />
                    }
                </div>
            </div>

        </section>
    )
}

export default NewProduct