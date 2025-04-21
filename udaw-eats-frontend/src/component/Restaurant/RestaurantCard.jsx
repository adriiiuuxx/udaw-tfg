/* eslint-disable no-constant-condition */
import { Card, Chip, IconButton } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavouriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites } from '../../State/Authentication/action';
import { isPresentInfavourites } from '../Config/logic';

export const RestaurantCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);

    const handleAddToFavorites = () => {
        dispatch(addToFavorites({ restaurantId: item.id, jwt }));
    };

    const handleNavigateToRestaurant = () =>{
        if(item.opened){
            navigate(`/restaurant/${item.name}/${item.id}`)
        }
    }



    return (
        <Card className='w-[18rem]'>
            <div className={`${true ? 'cursor-pointer' : "cursor-not-allowed"} relative`}>
                <img
                    className='w-full h-[10rem] object-cover rounded-t-md'
                    src={item.images?.[0] || 'default-image-url.jpg'}
                    alt={item.name || item.title || 'Restaurant'}
                />

                <Chip
                    size='small'
                    className='absolute top-2 left-2'
                    color={item.opened ? "success" : "error"}
                    label={item.opened ? "Opened" : "Closed"}
                />
            </div>

            <div className='p-4 textPart lg:flex w-full justify-between'>
                <div className='space-y-1'>
                    <p className='font-semibold text-lg cursor-pointer' onClick={handleNavigateToRestaurant}>
                        {item.name || item.title || 'Unnamed Restaurant'}
                    </p>
                    <p className='text-gray-500 text-sm'>
                        {item.description || 'No description available'}
                    </p>
                </div>

                <div>
                    <IconButton onClick={handleAddToFavorites}>
                        {isPresentInfavourites(auth.favourites, item) ? <FavoriteIcon /> : <FavouriteBorderIcon />}
                    </IconButton>
                </div>
            </div>
        </Card>
    );
};