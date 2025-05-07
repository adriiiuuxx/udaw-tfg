/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Divider, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { MenuCard } from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantCategory } from '../../State/Restaurant/action';
import { getMenuItemsByRestaurantId } from '../../State/Menu/action'

const foodTypes = [
    { label: "ALL", value: "all" },
    { label: "VEGETARIAN ONLY", value: "vegetarian" },
    { label: "NOT VEGETARIAN", value: "non-vegetarian" }
]


export const RestaurantDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth, restaurant, menu } = useSelector(store => store);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [foodType, setFoodType] = React.useState("all");

    const handleFilter = (e) => {

        setFoodType(e.target.value);
    };
    const handleFilterCategory = (e) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);

    };

    const { id } = useParams();


    useEffect(() => {
        dispatch(getRestaurantById({ restaurantId: id, jwt }));
        dispatch(getRestaurantCategory({ restaurantId: id, jwt }));

    }, [])

    useEffect(() => {
        dispatch(
            getMenuItemsByRestaurantId({
                restaurantId: id,
                jwt,
                vegetarian: foodType === "vegetarian",
                nonVegetarian: foodType === "non-vegetarian",
                foodCategory: selectedCategory
            }))
    }, [selectedCategory, foodType])

    return (
        <div className='px-5 lg:px-20'>
            <section>
                {/*                 <h3 className='text-gray-500 py-2 mt-10'>Home/Galician/Bodegon Prestige/1</h3> */}
                <div>
                    <div className="flex flex-col gap-4 p-4">

                        <div>
                            <img
                                src={restaurant.restaurant?.images[1]}
                                alt="Grande"
                                className="w-full h-[60vh] object-cover rounded-xl shadow-lg"
                            />
                        </div>


                        <div className="flex flex-col md:flex-row gap-4">
                            <img
                                src={restaurant.restaurant?.images[0]}
                                alt="Pequeña 1"
                                className="w-full md:w-1/2 h-[40vh] object-cover rounded-xl shadow-lg"
                            />
                            <img
                                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/79/cf/07/prestige-tenemos-un-comedor.jpg?w=800&h=500&s=1"
                                alt="Pequeña 2"
                                className="w-full md:w-1/2 h-[40vh] object-cover rounded-xl shadow-lg"
                            />
                        </div>
                    </div>


                </div>

                <div className='pt-3 pb-5'>
                    <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
                    <p className='text-gray-500 mt-1'>
                        {restaurant.restaurant?.description}
                    </p>
                    <div className='space-y-3 mt-3'>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <LocationOnIcon /> {restaurant.restaurant?.address.street} ,  {restaurant.restaurant?.address.city}
                        </p>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <CalendarTodayIcon /> {restaurant.restaurant?.openingHours}
                        </p>
                    </div>
                </div>
            </section>
            <Divider />
            <section className='pt-[2rem] lg:flex relative'>

                <div className='space-y-10 lg:w-[20%] filter'>
                    <div className='box space-y-5 lg:sticky top-28 p-5 shadow-md'>
                        <div>
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                                Food type
                            </Typography>

                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup name='food_type' value={foodType} onChange={handleFilter}>
                                    {foodTypes.map((item) => (
                                        <FormControlLabel
                                            key={item.value}
                                            value={item.value}
                                            control={<Radio />}
                                            label={item.label}
                                        />))}
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <Divider />

                        <div>
                            <Typography variant='h5' sx={{ paddingBottom: "1rem", paddingTop: "1rem" }}>
                                Food Category
                            </Typography>

                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup name='food_category' value={selectedCategory} onChange={handleFilterCategory}>
                                    {restaurant.categories.map((item) => (
                                        <FormControlLabel
                                            key={item.id}
                                            value={item.name}
                                            control={<Radio />}
                                            label={item.name}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>

                    </div>
                </div>

                <div className='space-y-10 lg:w-[80%] lg:pl-10'>
                    {menu.menuItems.map((item) => <MenuCard item={item} />)}
                </div>

            </section>
        </div>
    )
}
