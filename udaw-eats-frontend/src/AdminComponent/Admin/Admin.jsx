import React, { useState } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { Route, Routes } from 'react-router-dom'
import { Orders } from '../Orders/Orders'
import { Menu } from '../Menu/Menu'
import { FoodCategory } from '../FoodCategory/FoodCategory'
import { Ingredients } from '../Ingredients/Ingredients'
import { RestaurantDetails } from './RestaurantDetails'
import { RestaurantDashboard } from '../RestaurantDashboard/RestaurantDashboard'
import { CreateMenuForm } from '../Menu/CreateMenuForm'
import MenuIcon from '@mui/icons-material/Menu'
import { useMediaQuery } from '@mui/material'

export const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isSmallScreen = useMediaQuery("(max-width:1080px)")

  const handleClose = () => setSidebarOpen(false)
  const handleOpen = () => setSidebarOpen(true)

  return (
    <div>
      {isSmallScreen && !sidebarOpen && (
        <button
          onClick={handleOpen}
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1301,
            background: '#1976d2', // MUI primary main
            border: 'none',
            cursor: 'pointer',
            borderRadius: '50%',
            padding: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <MenuIcon fontSize="large" style={{ color: '#fff' }} />
        </button>
      )}
      <div className='lg:flex justify-between'>
        <div>
          <AdminSidebar open={isSmallScreen ? sidebarOpen : true} handleClose={handleClose} />
        </div>
        <div className='lg:w-[80%]'>
          <Routes>
            <Route path='/' element={<RestaurantDashboard />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/category' element={<FoodCategory />} />
            <Route path='/ingredients' element={<Ingredients />} />
            <Route path='/details' element={<RestaurantDetails />} />
            <Route path='/add-menu' element={<CreateMenuForm />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}