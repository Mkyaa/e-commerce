import React from 'react'

// styles
import styles from './index.module.css'

// Formik
import { Field, Form, Formik } from 'formik'

// Yup
import * as Yup from 'yup';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// Local storage
const users = JSON.parse(localStorage.getItem('users')) || []

// Yup validation schema
const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  surname: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(12, 'Too Long!')
    .required('Required'),
  address: Yup.string()
    .min(6, 'Too Short!')
    .max(140, 'Too Long!')
    .required('Required')
})

const SignUp = () => {

  // react-router-dom
  const navigate = useNavigate()

  return (
    <section id='signup-container' className={styles.signUpWrapper}>
      <div className={styles.signUpContainer}>
        <h1>Sign Up</h1>
        <Formik
          initialValues={{
            id: '',
            name: '',
            surname: '',
            email: '',
            password: '',
            address: '',
            favorites: [],
            cart: []
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values, e) => {
            const newUser = {
              id: users.length + 1,
              name: values.name,
              surname: values.surname,
              email: values.email,
              password: values.password,
              address: values.address,
              favorites: [],
              cart: []
            }
            users.push(newUser)
            localStorage.setItem('users', JSON.stringify(users))
            e.resetForm()
            navigate('/login')
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.signUpForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <Field name="name"/>
                {errors.name && touched.name ? <small>{errors.name}</small> : null}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="surname">Last Name</label>
                <Field name='surname'/>
                {errors.surname && touched.surname ? <small>{errors.surname}</small> : null}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <Field name="email" type="email"/>
                {errors.email && touched.email ? <small>{errors.email}</small> : null}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <Field name="password" type="password"/>
                {errors.password && touched.password ? <small>{errors.password}</small> : null}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address">Address</label>
                <Field name="address" as='textarea' rows='6' className=' ' />
                {errors.address && touched.address ? <small>{errors.address}</small> : null}
              </div>
              <button type="submit" className={styles.signUpSubmit}>Sign Up</button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}


export default SignUp