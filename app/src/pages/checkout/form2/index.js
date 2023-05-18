import React from 'react'

// Styles
import styles from './index.module.css'

//Formik
import { Field, Form, Formik } from 'formik';

// Yup
import * as Yup from 'yup';

// Context
import { useSite } from '../../../context/SiteContext';

// Validation Schema with Yup
const ApproveOrderScheme = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(16, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(16, 'Too Long!')
        .required('Required'),
    address: Yup.string()
        .min(2, 'Too Short!')
        .max(140, 'Too Long!')
        .required('Required'),
    country: Yup.string()
        .min(2, 'Too Short!')
        .max(16, 'Too Long!')
        .required('Required'),
    city: Yup.string()
        .min(2, 'Too Short!')
        .max(16, 'Too Long!')
        .required('Required'),
    state: Yup.string()
        .min(2, 'Too Short!')
        .max(16, 'Too Long!')
        .required('Required'),
    zip: Yup.string()
        .min(2, 'Too Short!')
        .max(16, 'Too Long!')
        .required('Required'),
    phone: Yup.string()
        .min(2, 'Too Short!')
        .max(16, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
})

const Form2 = ({ nextForm, total}) => {

    // Context state
    const { cart, setCart } = useSite()

    return (
        <section id='approve-form' className={styles.approveFormWrapper}>
            <div id='approve-container' className={styles.formContainer}>
                <Formik
                    initialValues={{
                        name: '',
                        lastName: '',
                        country: '',
                        address: '',
                        city: '',
                        state: '',
                        zip: '',
                        phone: '',
                        email: ''
                    }}
                    validationSchema={ApproveOrderScheme}
                    onSubmit={(values, e) => {
                        const order = {
                            name: values.name,
                            lastName: values.lastName,
                            country: values.country,
                            address: values.address,
                            city: values.city,
                            state: values.state,
                            zip: values.zip,
                            phone: values.phone,
                            email: values.email,
                            total: total,
                            cart: cart
                        }
                        localStorage.setItem('order', JSON.stringify(order))
                        localStorage.setItem('cart', JSON.stringify([]))
                        setCart([])
                        nextForm()
                    }}
                >
                    {({ errors, touched }) => (

                        <Form className={styles.form}>
                            <div id='left-approve' className={styles.leftApprove}>
                                <h1>BILLING DETAIL</h1>
                                <div className={styles.formGroupTop}>
                                    <div>
                                        <label htmlFor='name'>Name
                                            <p>*</p>
                                        </label>
                                        <Field name='name' type='text'/>
                                        {errors.name && touched.name ? (<small>{errors.name}</small>) : null}
                                    </div>
                                    <div>
                                        <label htmlFor='name'>Last Name
                                            <p>*</p>
                                        </label>
                                        <Field name='lastName' type='text'/>
                                        {errors.lastName && touched.lastName ? (<small>{errors.lastName}</small>) : null}
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor='name'>Country
                                        <p>*</p>
                                    </label>
                                    <Field name='country' type='text'/>
                                    {errors.country && touched.country ? (<small>{errors.country}</small>) : null}
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor='name' >Address
                                        <p>*</p>
                                    </label>
                                    <Field name="address" as='textarea' className='h-24' />
                                    {errors.address && touched.address ? (<small>{errors.address}</small>) : null}
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor='name' >City
                                        <p>*</p>
                                    </label>
                                    <Field name='city' type='text'/>
                                    {errors.city && touched.city ? (<small>{errors.city}</small>) : null}
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor='name' >State
                                        <p>*</p>
                                    </label>
                                    <Field name='state' type='text'/>
                                    {errors.state && touched.state ? (<small>{errors.state}</small>) : null}
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor='name' >Zip
                                        <p>*</p>
                                    </label>
                                    <Field name='zip' type='text'/>
                                    {errors.zip && touched.zip ? (<small>{errors.zip}</small>) : null}
                                </div>
                                <div className={styles.formGroupBottom}>
                                    <div>
                                        <label htmlFor='name' >Email
                                            <p>*</p>
                                        </label>
                                        <Field name='email' type='email'/>
                                        {errors.email && touched.email ? (<small>{errors.email}</small>) : null}
                                    </div>
                                    <div>
                                        <label htmlFor='name' >Phone
                                            <p>*</p>
                                        </label>
                                        <Field name='phone' type='text'/>
                                        {errors.phone && touched.phone ? (<small>{errors.phone}</small>) : null}
                                    </div>
                                </div>
                            </div>
                            <div id='right-approve' className={styles.rightApprove}>
                                <h1>YOUR ORDER</h1>
                                <div className={styles.rightApproveTitleBox}>
                                    <h1>Product</h1>
                                    <h1>Total</h1>
                                </div>
                                <div className={styles.rightApprovePriceBox}>
                                    {
                                        cart && cart.length > 0
                                            ? cart.map((item, index) => {
                                                return (
                                                    <div key={index} className={styles.priceBox}>
                                                        <span>{index + 1}.{item.title}</span>
                                                        <p>${item.price * item.quantity}</p>
                                                    </div>
                                                )
                                            }
                                            )
                                            : <p>No items</p>
                                    }
                                </div>
                                <div className={styles.rightApproveTotalBox}>
                                    <div>
                                        <h1>Subtotal</h1>
                                        <h1>${total}</h1>
                                    </div>
                                    <div>
                                        <h1>Total</h1>
                                        <h1>${total}</h1>
                                    </div>
                                    <button type='submit' className={styles.nextBtn}>PROCEED TO CHECKOUT</button>

                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </section >
    )
}

export default Form2