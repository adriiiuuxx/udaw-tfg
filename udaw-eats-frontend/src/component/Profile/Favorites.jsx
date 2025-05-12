import React from 'react'
import { RestaurantCard } from '../Restaurant/RestaurantCard'
import { useSelector } from 'react-redux'

export const Favorites = () => {
    // Select only the specific part of the state that we need
    const auth = useSelector(state => state.auth)
    return (
        <div>
            <h1 className='py-5 text-xl font-semibold text-center'>My favorites</h1>
            <div className='flex flex-wrap gap-3 justify-center'>

                {auth.favourites.map((item) => <RestaurantCard  item={item}/>)}

            </div>

        </div>
    )
}
