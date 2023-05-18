import React from 'react'

// styles
import styles from './index.module.css'

// formik
import { useFormik } from 'formik';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// context
import { useAuth } from '../../../context/AuthContext';

const Login = () => {

    // Context state
    const { setUser, setIsLogged } = useAuth()

    // react-router-dom
    const navigate = useNavigate()

    // Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            const users = JSON.parse(localStorage.getItem('users'))
            const user = users.find(user => user.email === values.email && user.password === values.password)
            if (user) {
                setTimeout(() => {
                    const userObj = localStorage.setItem('user', JSON.stringify(user))
                    setUser(userObj)
                    setIsLogged(true)
                    navigate('/')
                }
                    , 500)
            }
            else {
                alert('Wrong email or password')
            }
        },
    });

    return (
        <section id='login-container' className={styles.loginWrapper}>
            <div className={styles.loginContent}>
                <h1>Login</h1>
                <form onSubmit={formik.handleSubmit} className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            placeholder='Enter your password'
                        />
                    </div>
                    <button type='submit' className={styles.loginSubmit}>Login</button>
                </form>

            </div>
        </section>
    )
}

export default Login