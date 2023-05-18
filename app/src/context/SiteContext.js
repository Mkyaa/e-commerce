import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";

//axios
import axios from 'axios'

//create the context
const Context = createContext()

//create the hook
const useSite = () => useContext(Context)

//fetch data from api hook
const useFetch = (url) => {
    const [data, setData] = useState();
    const [error, setError] = useState();
  
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await axios.get(url);
          setData(response.data.products);
        } catch (error) {
          setError(error);
        }
      };
      getData();
    }, [url]);
  
    if (error) {
      console.log(error);
    }
  
    return data;
  };


const Provider = ({ children }) => {

    //state
    const [burger, setBurger] = useState(false)
    const [allData, setAllData] = useState()
    const [favorites, setFavorites] = useState(localStorage.getItem('favs') ? JSON.parse(localStorage.getItem('favs')) : [])
    const [openFavorites, setOpenFavorites] = useState(false)
    const [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [])
    const [openCart, setOpenCart] = useState(false)

    const closeFavorites = () => {
        setOpenFavorites(false)
    }

    const closeCart = () => {
        setOpenCart(false)
    }

    const closeBurger = () => {
        setBurger(false)
    }

     // All remove from favorites
     const allRemoveFavorites = () => {
      const updatedFavorites = []
      localStorage.setItem('favs', JSON.stringify(updatedFavorites))
      setFavorites(updatedFavorites)
  }

      //All remove from cart
      const allRemoveCart = () => {
        const updatedCart = []
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCart(updatedCart)
    }

    //data
    const data = {
        burger, setBurger,
        allData, setAllData,
        favorites, setFavorites,
        openFavorites, setOpenFavorites,
        cart, setCart,
        openCart, setOpenCart,
        closeFavorites, closeCart, closeBurger,
        allRemoveFavorites, allRemoveCart
    }

    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}

export { useSite, useFetch  }


export default Provider