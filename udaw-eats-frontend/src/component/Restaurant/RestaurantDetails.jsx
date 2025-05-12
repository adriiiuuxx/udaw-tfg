/**
 * @fileoverview Restaurant Details Component
 * 
 * This file contains the RestaurantDetails component, which is the main customer-facing
 * interface for viewing a restaurant's information and menu. It's one of the most important
 * components in the application as it directly impacts the customer ordering experience.
 * 
 * The component provides:
 * - A visual showcase of the restaurant with multiple images
 * - Detailed restaurant information (name, description, address, opening hours, contact)
 * - Interactive menu filtering by food type (all, vegetarian, non-vegetarian)
 * - Category-based menu filtering using the restaurant's food categories
 * - Display of all menu items with their details
 * 
 * This component integrates with Redux to fetch and manage restaurant data, categories,
 * and menu items, with real-time filtering capabilities.
 * 
 * @requires react
 * @requires react-router-dom
 * @requires react-redux
 * @requires @mui/material
 * @requires @mui/icons-material
 */
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
import PhoneIcon from '@mui/icons-material/Phone';

const foodTypes = [
    { label: "ALL", value: "all" },
    { label: "VEGETARIAN ONLY", value: "vegetarian" },
    { label: "NOT VEGETARIAN", value: "non-vegetarian" }
]

const defaultImage = "https://plus.unsplash.com/premium_photo-1726812198035-82a66af2f26a?q=80&w=2037&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

/**
 * RestaurantDetails Component
 * 
 * This component renders a comprehensive view of a restaurant and its menu for customers.
 * It serves as the main interface for customers to browse restaurant details and menu items
 * before placing an order.
 * 
 * Key features:
 * - Displays restaurant images in a responsive gallery layout
 * - Shows restaurant details including name, description, address, hours, and contact info
 * - Provides interactive filtering for menu items by food type and category
 * - Renders menu items in a card-based layout with all necessary details
 * 
 * The component uses URL parameters to identify which restaurant to display and makes
 * API calls to fetch all necessary data when mounted. It also handles real-time filtering
 * of menu items based on user selections.
 * 
 * @returns {JSX.Element} The rendered RestaurantDetails component
 */
export const RestaurantDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    // Select only the specific parts of the state that we need
    const auth = useSelector(state => state.auth);
    const restaurant = useSelector(state => state.restaurant);
    const menu = useSelector(state => state.menu);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [foodType, setFoodType] = React.useState("all");

    /**
     * Handles food type filter changes
     * 
     * This function updates the food type filter when a user selects a different option
     * (ALL, VEGETARIAN ONLY, NOT VEGETARIAN). When the filter changes, the useEffect hook
     * will trigger a new API call to fetch filtered menu items.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the radio button group
     */
    const handleFilter = (e) => {
        setFoodType(e.target.value);
    };
    /**
     * Handles food category filter changes
     * 
     * This function updates the selected food category when a user selects a different category
     * from the radio button group. The selected category is used to filter menu items by their
     * assigned category (e.g., Appetizers, Main Courses, Desserts).
     * 
     * When the selected category changes, the useEffect hook will trigger a new API call
     * to fetch menu items belonging to that category.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the radio button group
     */
    const handleFilterCategory = (e) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
    };

    const { id } = useParams();


    /**
     * Fetches initial restaurant data when the component mounts
     * 
     * This effect runs once when the component is first rendered and fetches:
     * 1. The restaurant details using the ID from the URL parameters
     * 2. The restaurant's food categories for the filtering sidebar
     * 
     * These API calls populate the Redux store with the necessary data for rendering
     * the restaurant information and category filter options.
     */
    useEffect(() => {
        dispatch(getRestaurantById({ restaurantId: id, jwt }));
        dispatch(getRestaurantCategory({ restaurantId: id, jwt }));
    }, [])

    /**
     * Fetches filtered menu items when filter criteria change
     * 
     * This effect runs whenever the user changes the food type filter or category filter.
     * It dispatches an action to fetch menu items with the current filter criteria:
     * - Restaurant ID (from URL parameters)
     * - Vegetarian filter status
     * - Non-vegetarian filter status
     * - Selected food category
     * 
     * The API returns only the menu items that match all the specified criteria,
     * allowing for real-time filtering of the menu without requiring page reloads.
     */
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

                        {/* Imagen grande */}
                        <div>
                            <img
                                src={restaurant.restaurant?.images?.[0] ?? defaultImage}
                                alt="Grande"
                                className="w-full h-[60vh] object-cover rounded-xl shadow-lg"
                            />
                        </div>

                        {/* Imágenes pequeñas */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <img
                                src={restaurant.restaurant?.images?.[1] ?? defaultImage}
                                alt="Pequeña 1"
                                className="w-full md:w-1/2 h-[40vh] object-cover rounded-xl shadow-lg"
                            />
                            <img
                                src={restaurant.restaurant?.images?.[2] ?? defaultImage}
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
                        <p className='text-gray-500 flex items-center gap-3'>
                            <PhoneIcon /> {restaurant.restaurant?.contactInformation.mobile}
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
