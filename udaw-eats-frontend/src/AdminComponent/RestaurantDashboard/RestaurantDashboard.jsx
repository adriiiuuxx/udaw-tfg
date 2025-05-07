import { Grid, Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { MenuTable } from '../Menu/MenuTable'
import { OrderTable } from '../Orders/OrderTable'

export const RestaurantDashboard = () => {
  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Menu
            </Typography>
            <MenuTable />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Orders
            </Typography>
            <OrderTable />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}