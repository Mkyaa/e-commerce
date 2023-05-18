import React, { useEffect } from 'react'

// Site Context
import SiteProvider from './context/SiteContext'

//Auth Context
import AuthProvider from './context/AuthContext'

// Router
import { Routes, Route } from 'react-router-dom'

// Components
import Header from './layout/header';

// Pages
import Home from './pages/home';
import Shop from './pages/shop';
import Contact from './pages/contact';
import Main from './layout/main';
import ProductDetails from './components/productDetails';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signUp';
import CheckOut from './pages/checkout';

function App() {

  // add to local storage if not exist
  if (!localStorage.getItem('favs')) {
    localStorage.setItem('favs', JSON.stringify([]))
  }
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]))
  }

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // categories for shop page
  const shopCategories = [`Smartphones`, `Laptops`, `Fragrances`, `Skincare`, `Home Decoration`, `Furniture`, `Tops`, `Sunglasses`, `Automotive`, `Motorcycle`, `Lighting`,]
  const womensCategories = [`Women's Dresses`, `Women's Shoes`, `Women's Watches`, `Women's Bags`, `Women's Jewellery`]
  const mensCategories = [`Men's Shirts`, `Men's Shoes`, `Men's Watches`]

  return (
    <AuthProvider>
      <SiteProvider>
        <div id='app' className='w-full max-w-full min-h-screen flex flex-col bg-home-bg bg-cover bg-center bg-fixed relative' >
          <Header />
          <Routes>
            <Route path="/" exact element={<Main />}>
              <Route index={true} element={<Home />} />
              <Route path='shop/product/:id' element={<ProductDetails />} />
            </Route>
            <Route path="/womens" exact element={<Main />}>
              <Route index={true} element={<Shop categories={womensCategories} />} />
              <Route path='shop/product/:id' element={<ProductDetails />} />
            </Route>
            <Route path="/mens" exact element={<Main />}>
              <Route index={true} element={<Shop categories={mensCategories} />} />
              <Route path='shop/product/:id' element={<ProductDetails />} />
            </Route>
            <Route path="/shop" exact element={<Main />} >
              <Route index={true} element={<Shop categories={shopCategories} />} />
              <Route path='shop/product/:id' element={<ProductDetails />} />
            </Route >
            <Route path='/contact' element={<Main />}>
              <Route index={true} element={<Contact />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/checkout' element={<Main />} >
              <Route index={true} element={<CheckOut />} />
            </Route>
          </Routes>
        </div>
      </SiteProvider>
    </AuthProvider>
  );
}

export default App;