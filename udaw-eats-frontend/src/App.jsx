/* eslint-disable react-hooks/exhaustive-deps */
import { ThemeProvider } from '@emotion/react'
import './App.css'
import { Navbar } from './component/Navbar/Navbar'
import { darkTheme } from './theme/DarkTheme'
import { CssBaseline } from '@mui/material';
import { Home } from './component/Home/Home'
import React from 'react'
import { RestaurantDetails } from './component/Restaurant/RestaurantDetails'
import { Cart } from './component/Cart/Cart';
import { Profile } from './component/Profile/Profile'
import { CustomerRoute } from './Routers/CustomerRoute';
import { getUser } from './State/Authentication/action';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { findCart } from './State/Cart/action';


function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(store => store);

  useEffect(() => {
    // Only dispatch getUser if we have a valid token
    if (auth.jwt || jwt) {
      dispatch(getUser(auth.jwt || jwt));
    }
    dispatch(findCart(jwt));
  }, [auth.jwt, dispatch]);

  return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {/*  <Navbar /> */}

      {/* <Home></Home> */}

      {/* <RestaurantDetails></RestaurantDetails> */}

      {/* <Cart></Cart> */}

      {/* <Profile></Profile> */}

      <CustomerRoute></CustomerRoute>

    </ThemeProvider>
  );
}

export default App
