import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import React from 'react'
import { useDispatch } from 'react-redux'
import { updateRestaurantStatus } from '../../State/Restaurant/action'
import { useSelector } from 'react-redux'

export const RestaurantDetails = () => {
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleRestaurantStatus = () => {
    dispatch(updateRestaurantStatus({
      restaurantId: restaurant.usersRestaurant.id,
      jwt: jwt}));
  };

  return (
    <div className='lg:px-20 px-5 pb-10'>
      <div className='py-5 flex justify-center items-center gap-5'>
        <h1 className='text-2xl lg:text-6xl font-bold'>{restaurant.usersRestaurant?.name}</h1>
        <Button
          color={restaurant.usersRestaurant?.opened ? "error" : "primary"}
          className='py-[1rem] px-[2rem]'
          variant='contained'
          onClick={handleRestaurantStatus}
          size='large'>
          {restaurant.usersRestaurant?.opened ? "Close" : "Open"}
        </Button>
      </div>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardHeader title={<span className='text-gray-300'>Restaurant</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>

                <div className='flex'>
                  <p className='w-48'>Owner</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.owner.fullName}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Restauarant Name</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.name}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Cuisine Type</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.cuisineType}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Opening Hours</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.openingHours}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Status</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.opened ? <span className='px-5 py-2 rounded-full bg-green-400
                     text-gray-950'>Opened</span> : <span className='px-5 py-2 rounded-full bg-red-500
                     text-gray-950'>Closed</span>}
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardHeader title={<span className='text-gray-300'>Address</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>

                <div className='flex'>
                  <p className='w-48'>Street</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.address.street}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>City</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.address.city}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Province</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.address.state}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Postal Code</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.address.zipCode}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardHeader title={<span className='text-gray-300'>Contact</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>

                <div className='flex'>
                  <p className='w-48'>Email</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.contactInformation.email}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Mobile</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.contactInformation.mobile}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Social</p>
                  <div className='flex text-gray-400 items-center pb-3 gap-2'>
                    <span className='pr-5'>-</span>
                    <a href="#">
                      <InstagramIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href="#">
                      <XIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href="#">
                      <FacebookIcon sx={{ fontSize: "3rem" }} />
                    </a>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
