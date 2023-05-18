import React, { useEffect } from 'react'

//styles
import styles from './index.module.css'

//fontawesome
import { faCircleInfo, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Contact = () => {

  // local storage for messages
  const messageLocal = JSON.parse(localStorage.getItem('message')) ? JSON.parse(localStorage.getItem('message')) : localStorage.setItem('message', JSON.stringify([]))

  // send message
  const sendMessage = (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const subject = e.target[2].value
    const message = e.target[3].value
    const messageObject = {
      name,
      email,
      subject,
      message
    }
    messageLocal.push(messageObject)
    localStorage.setItem('message', JSON.stringify(messageLocal))
    e.target.reset()
    alert('Message sent successfully')
  }

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <section id='contact-container' className={styles.contactContainer}>
      <div className={styles.contactContent}>
        <div id='contact-left-wrapper' className={styles.leftContact}>
          <h1 className={styles.contactTitle} >CONTACT INFO
            <i></i>
          </h1>
          <article className={styles.contactDetailsBox}>
            <div>
              <div className={styles.adressDetails}>
                <FontAwesomeIcon icon={faLocationDot} />
                <p>Adress</p>
              </div>
              <span className={styles.adressDetail}>Istiklal, Bahçıvan Sk. 23-15, 34522 Beylikdüzü Osb/Esenyurt/Istanbul</span>
            </div>
            <div>
              <div  className={styles.adressDetails}>
                <FontAwesomeIcon icon={faPhone}/>
                <p>Phone</p>
              </div>
              <span>+905445106634</span>
            </div>
            <div>
              <div  className={styles.adressDetails}>
                <FontAwesomeIcon icon={faCircleInfo}/>
                <p>Support</p>
              </div>
              <span>kayamert@live.com</span>
            </div>
          </article>
          <div className={styles.sendMsgBox}>
            <h1>SEND MESSAGE</h1>
            <form className={styles.form} onSubmit={sendMessage}>
              <input type='text' placeholder='Name'/>
              <input type='email' placeholder='Email'/>
              <input type='text' placeholder='Subject'/>
              <textarea placeholder='Message' className='h-40'></textarea>
              <button>Send Message</button>
            </form>
          </div>
        </div>
        <div id='contact-right-wrapper' className={styles.rightContact}>
          <iframe title='maps-contact' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5060.557563272568!2d28.646766884636925!3d41.046570784733355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55f34c0918855%3A0x502a8beafbec4ef3!2zxLBzdGlrbGFsLCBCYWjDp8SxdmFuIFNrLiAyMy0xNSwgMzQ1MjIgQmV5bGlrZMO8esO8IE9zYi9Fc2VueXVydC_EsHN0YW5idWw!5e0!3m2!1str!2str!4v1683744594889!5m2!1str!2str"
           style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
  )
}

export default Contact