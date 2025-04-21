import React, { useEffect } from 'react'
import './Home.css'
import { MultiItemCarousel } from './MultiItemCarousel'
import { RestaurantCard } from '../Restaurant/RestaurantCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRestaurants } from '../../State/Restaurant/action'


export const Home = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store)

    useEffect(() => {
        dispatch(getAllRestaurants(jwt))
    }, [dispatch, jwt]);



    return (
        <div className='pb-10'>
            <section className='banner -z-50 realtive flex flex-col justify-center items-center'>

                <div className='w-[50vw] z-10 text-center'>
                    <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>UDAW EATS</p>
                    <p className='z-10 text-gray-300 text-xl lg:text-4xl'>Taste the best food in your area</p>
                </div>

                <div className='cover absolute top-0 left-0 right-0'>

                </div>

                <div className='fadeout'>

                </div>
            </section>

            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Top Meals</p>
                <MultiItemCarousel></MultiItemCarousel>
            </section>

            <section className='px-5 lg:px-20 pt-10'>
                <h1 className='text-2xl font-semibold text-gray-400 pb-8'>
                    Order from our handpicked favourites
                </h1>
                <div className='flex flex-wrap gap-5 items-center justify-around py-10'>
                    {
                        restaurant.restaurants.map((item) => <RestaurantCard item={item} />)

                    }

                </div>
            </section>
        </div>
    )
}
