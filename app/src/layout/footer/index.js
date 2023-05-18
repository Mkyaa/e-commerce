import React from 'react'

//styles
import styles from './index.module.css'

// insta posts
import img1 from '../../assets/images/insta-posts/insta-1.jpg.webp'
import img2 from '../../assets/images/insta-posts/insta-2.jpg.webp'
import img3 from '../../assets/images/insta-posts/insta-3.jpg.webp'
import img4 from '../../assets/images/insta-posts/insta-4.jpg.webp'
import img5 from '../../assets/images/insta-posts/insta-5.jpg.webp'
import img6 from '../../assets/images/insta-posts/insta-6.jpg.webp'

// pay systems
import pay1 from '../../assets/images/payment/payment-1.png.webp'
import pay2 from '../../assets/images/payment/payment-2.png.webp'
import pay3 from '../../assets/images/payment/payment-3.png.webp'
import pay4 from '../../assets/images/payment/payment-4.png.webp'
import pay5 from '../../assets/images/payment/payment-5.png.webp'

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faPinterest, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

//react router dom
import { Link } from 'react-router-dom'


const Footer = () => {

  //images for insta posts and pay systems
  const instaPosts = [img1, img2, img3, img4, img5, img6]
  const paySystems = [pay1, pay2, pay3, pay4, pay5]


  return (
    <footer className={styles.footerWrapper}>
      <div id='inst-post' className={styles.instaPostContainer}>
        {
          instaPosts.map((post, index) => {
            return (
              <div className={`${styles.instaPostBox} group `} key={index}>
                <div className={`${styles.instaExpBox} group-hover:opacity-100 `}>
                  <FontAwesomeIcon icon={faInstagram} y />
                  <p className=''>@ig_username</p>
                </div>
                <img src={post} alt={`insta-post-${index}`} />
              </div>
            )
          })
        }
      </div>

      <div >
        <div className={styles.bottomFooter}>
          <div id='left-footer' className={styles.bottomLeftFooter}>
            <div className={styles.bottomLeftCont}>
              <h1>Logo</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className={styles.bottomPayCont}>
                {
                  paySystems.map((pay, index) => {
                    return (
                      <img src={pay} alt={`pay-system-${index}`} key={index} />
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div id='right-footer' className={styles.bottomRightFooter}>
            <div className={styles.bottomRightCont}>
              <h1>NEWSLETTER</h1>
              <div className={styles.bottomSubBox}>
                <input type='text' placeholder='Enter your email' />
                <button>Subscribe</button>
              </div>
              <div className={styles.bottomRightFontsBox}>
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faYoutube} />
                <FontAwesomeIcon icon={faPinterest} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomDesignBox}>
        <p>© 2023 All Rights Reserved. Design by
          <Link to='https://www.github.com/Mkyaa'>MertKaya</Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer