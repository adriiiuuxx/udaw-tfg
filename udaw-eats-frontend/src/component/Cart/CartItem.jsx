import { Chip, IconButton } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { findCart, removeCartItem, updateCartItem } from '../../State/Cart/action';

export const CartItem = ({ item }) => {
    const { auth } = useSelector((store) => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleUpdateCartItem = (value) => {
        if (value == -1 && item.quantity == 1) {
            handleRemoveCartItem();
        }
        const data = { cartItemId: item.id, quantity: item.quantity + value }
        dispatch(updateCartItem({ data, jwt }))
            .then(() => dispatch(findCart(jwt)));
    };

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt }))
    };

    return (
        <div className='px-5'>
            <div className='lg:flex items-center lg:space-x-5'>

                <div>
                    <img className='w-[5rem] h-[5rem] object-cover rounded-t-md' src={item.food.images[0]} alt="cartItem" />
                </div>

                <div className='flex items-center justify-between lg:w-[70%]'>
                    <div className='space-y-1 lg:space-y-3 w-full'>
                        <p>{item.food.name}</p>
                        <div className='flex items-center space-x-1'>
                            <IconButton onClick={() => handleUpdateCartItem(-1)}>
                                <RemoveCircleOutlineIcon sx={{ color: "pink.A400" }} />
                            </IconButton>

                            <div className='w-5 h-5 text-xs flex items-center justify-center'>
                                {item.quantity}
                            </div>
                            <IconButton onClick={() => handleUpdateCartItem(1)}>
                                <AddCircleOutlineIcon sx={{ color: "pink.A400" }} />
                            </IconButton>
                        </div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p>{item.totalPrice}€</p>
                    </div>
                </div>
            </div>
            <div className='pt-3 space-x-2 mb-2.5'>
                {item.ingredients.map((ingredient) => <Chip label={ingredient} />)}
            </div>
        </div>
    )
}