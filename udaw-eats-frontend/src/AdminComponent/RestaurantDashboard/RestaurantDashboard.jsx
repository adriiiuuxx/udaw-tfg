/**
 * @fileoverview Restaurant Dashboard Component
 * 
 * This file contains the RestaurantDashboard component, which serves as the main interface
 * for restaurant owners to manage their restaurant operations. It displays critical business
 * information including current orders and menu items in a unified dashboard view.
 * 
 * The dashboard uses a dark theme (#121212) for better visibility and contrast, making it
 * easier for restaurant owners to monitor their business at a glance.
 * 
 * @requires @mui/material
 * @requires react
 * @requires ../Menu/MenuTable
 * @requires ../Orders/OrderTable
 */

import { Grid, Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { MenuTable } from '../Menu/MenuTable'
import { OrderTable } from '../Orders/OrderTable'

/**
 * RestaurantDashboard Component
 * 
 * This component provides a comprehensive dashboard for restaurant owners to manage their
 * restaurant operations. It displays two main sections:
 * 
 * 1. Orders Section: Shows all current and past orders with their status
 * 2. Menu Section: Displays all menu items with options to manage them
 * 
 * The component uses a responsive grid layout that adapts to different screen sizes,
 * ensuring a good user experience on both desktop and mobile devices.
 * 
 * When there are no orders or menu items, appropriate messages are displayed to guide
 * the restaurant owner on next steps.
 * 
 * @returns {JSX.Element} The rendered RestaurantDashboard component
 */
export const RestaurantDashboard = () => {
  return (
    <Box sx={{ p: 3, bgcolor: '#121212', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: '#1e1e1e', color: 'white' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Menu
            </Typography>
            <MenuTable />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: '#1e1e1e', color: 'white' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Orders
            </Typography>
            <OrderTable />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}