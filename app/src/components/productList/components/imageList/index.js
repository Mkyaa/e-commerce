import React from 'react'

//styles
import styles from './index.module.css'


const ImageList = ({id, image, index, setImgIndex }) => {

    //get the index of the image and set it to the state for the main image
    const getImgIndex = () => {
        setImgIndex(index)
        const productAlt = document.getElementById(`images-box-${id}`)
        const img = productAlt.querySelectorAll('img')
        img.forEach(i => {
            i.classList.remove('opacity-30')
            i.classList.remove('opacity-100')
            i.classList.add('opacity-30')
        })
        img[index].classList.remove('opacity-30')
        img[index].classList.add('opacity-100')
    }


    return (
        <div className={styles.imgListBox} onClick={getImgIndex} >
            {
                index === 0 ?
                    <img src={image} alt={index} className='opacity-100' />
                    :
                    <img src={image} alt={index} className='opacity-30' />
            }
        </div >
    )
}

export default ImageList