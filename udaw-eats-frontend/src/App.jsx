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
import { Routers } from './Routers/Routers';
import { getRestaurantById } from './State/Restaurant/action';


function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector(store => store);

  useEffect(() => {
    // Only dispatch getUser if we have a valid token
    if (auth.jwt || jwt) {
      dispatch(getUser(auth.jwt || jwt));
    }
    dispatch(findCart(jwt));
  }, [auth.jwt, dispatch]);

  useEffect(() => {
    if (auth.user && auth.user.restaurantId) {
      dispatch(getRestaurantById({ restaurantId: auth.user.restaurantId, jwt: auth.jwt || jwt }));
    }
  }, [auth.user, auth.jwt, jwt, dispatch]);

  return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Routers />

    </ThemeProvider>
  );
}

export default App
