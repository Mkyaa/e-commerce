import React from 'react'

//styles
import styles from './index.module.css'

// Images
import WomenFashion from '../../assets/images/banner/images/category-1.jpg.webp'
import MenFashion from '../../assets/images/banner/images/category-2.jpg.webp'
import KidsFashion from '../../assets/images/banner/images/category-3.jpg.webp'
import Cosmetics from '../../assets/images/banner/images/category-4.jpg.webp'
import Accessories from '../../assets/images/banner/images/category-5.jpg.webp'

//react-router-dom
import { Link } from 'react-router-dom'

const HomeCategories = () => {
    return (
        <section id='home-categories' className={styles.homeCategories}>
            <div className={styles.leftSide}>
                <img src={WomenFashion} alt='womens' className={styles.leftImage} />
                <article className={styles.leftArticle}>
                    <h1 className={styles.leftTitle}>Women's fashion</h1>
                    <p className={styles.leftText}>Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore edolore magna aliquapendisse ultrices gravida.</p>
                    <Link to='/womens' className={styles.link}>SHOP NOW</Link>
                </article>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.rightBox} >
                    <img src={MenFashion} alt='mens' className={styles.rightImage} />
                    <article className={styles.rightArticle}>
                        <h1 className={styles.rightTitle}>Men's fashion</h1>
                        <Link to='/mens' className={styles.link}>SHOP NOW</Link>
                    </article>
                </div>
                <div className={styles.rightBox} >
                    <img src={KidsFashion} alt='kids' className={styles.rightImage} />
                    <article className={styles.rightArticle}>
                        <h1 className={styles.rightTitle}>Kid's fashion</h1>
                        <Link to='/shop' className={styles.link}>SHOP NOW</Link>
                    </article>
                </div>
                <div className={styles.rightBox} >
                    <img src={Cosmetics} alt='cosmetics' className={styles.rightImage} />
                    <article className={styles.rightArticle}>
                        <h1 className={styles.rightTitle}>Skin Care</h1>
                        <Link to='/shop' className={styles.link}>SHOP NOW</Link>
                    </article>
                </div>
                <div className={styles.rightBox} >
                    <img src={Accessories} alt='accessories' className={styles.rightImage} />
                    <article className={styles.rightArticle}>
                        <h1 className={styles.rightTitle}>Sunglasses</h1>
                        <Link to='/shop' className={styles.link}>SHOP NOW</Link>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default HomeCategories