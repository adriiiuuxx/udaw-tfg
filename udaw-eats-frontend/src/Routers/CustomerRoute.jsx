import React from 'react'
import { Navbar } from '../component/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import { Home } from '../component/Home/Home'
import { RestaurantDetails } from '../component/Restaurant/RestaurantDetails'
import { Cart } from '../component/Cart/Cart'
import { Profile } from '../component/Profile/Profile'
import { Auth } from '../component/Auth/Auth'

export const CustomerRoute = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account/:register' element={<Home />} />
                <Route path='/restaurant/:title/:id' element={<RestaurantDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/my-profile/*' element={<Profile />} />          
            </Routes>
                        <Auth />
        </div>
    )
}
