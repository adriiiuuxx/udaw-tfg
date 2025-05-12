/**
 * @fileoverview Menu Table Component
 * 
 * This file contains the MenuTable component, which displays and manages all menu items for a restaurant.
 * It provides functionality to view menu items, their availability status, and delete menu items.
 * 
 * The component includes:
 * - A table displaying menu item information (name, image, category, price, ingredients, availability)
 * - Status indicators for item availability
 * - Delete functionality for removing menu items
 * - Empty state handling with a call-to-action when no menu items exist
 * 
 * @requires @mui/material
 * @requires react
 * @requires react-redux
 * @requires react-router-dom
 */
import { Avatar, Box, Card, CardHeader, Chip, IconButton, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteFood, getMenuItemsByRestaurantId } from '../../State/Menu/action';
import { updateMenuItemsAvailability } from '../../State/Menu/action'; 
import { Button } from '@mui/material';	

/**
 * MenuTable Component
 * 
 * Displays a table of restaurant menu items with functionality to view details and delete items.
 * The component fetches menu items based on the restaurant ID from the Redux store.
 * 
 * When there are no menu items to display, it shows a helpful message with a call-to-action
 * button that navigates to the menu item creation page.
 * 
 * @returns {JSX.Element} The rendered MenuTable component
 */
export const MenuTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    // Select only the specific parts of the state that we need
    const menu = useSelector(state => state.menu);
    const restaurant = useSelector(state => state.restaurant);

    useEffect(() => {
        dispatch(getMenuItemsByRestaurantId({
            restaurantId: restaurant.usersRestaurant.id,
            jwt,
            vegetarian: false,
            nonVegetarian: false,
            foodCategory: ""
        }));
    }, [dispatch, restaurant.usersRestaurant.id, jwt]);

    /**
     * Deletes a menu item from the restaurant's menu
     * 
     * This function dispatches the deleteFood action to the Redux store,
     * which makes an API call to remove the menu item from the backend.
     * After successful deletion, the menu items list will be automatically updated.
     * 
     * @param {number} id - The ID of the menu item to delete
     */
    const handleDeleteMenuItem = (id) => {
        dispatch(deleteFood({ foodId: id, jwt }));
    };

    /**
     * Toggles the availability status of a menu item
     * 
     * This function is critical for restaurant inventory management, allowing owners to
     * quickly mark items as available or unavailable without deleting them. When a menu
     * item is marked as unavailable, customers won't be able to order it.
     * 
     * The function dispatches the updateMenuItemsAvailability action to the Redux store,
     * which makes an API call to toggle the item's availability status in the backend.
     * The UI will automatically update to reflect the new status with color-coded buttons.
     * 
     * @param {number} id - The ID of the menu item to update availability for
     */
    const handleUpdateAvailability = (id) => {
        dispatch(updateMenuItemsAvailability({ foodId: id, jwt })); // Dispatch the action
    };

    return (
        <Box>
            <Card className='mt-2'>
                <CardHeader title={"Menu"} sx={{ pt: 2, alignItems: "center" }} action={
                    <IconButton onClick={() => navigate("/admin/restaurants/add-menu")} aria-label='settings'>
                        <CreateIcon />
                    </IconButton>
                } />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="right">Image</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="center">Ingredients</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Availability</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {menu.menuItems && menu.menuItems.length > 0 ? (
                                menu.menuItems.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.id}
                                        </TableCell>
                                        <TableCell align="right"><Avatar src={item.images[0]}></Avatar></TableCell>
                                        <TableCell align="right">{item.name}</TableCell>
                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {item.ingredients.map((ingredient) => (
                                                    <Chip
                                                        key={ingredient.id}
                                                        label={ingredient.name}
                                                    />
                                                ))}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">{item.price}€</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                onClick={() => handleUpdateAvailability(item.id)}
                                                variant="contained"
                                                color={item.available ? "success" : "error"}
                                            >
                                                {item.available ? "In Stock" : "Out of Stock"}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color='primary' onClick={() => handleDeleteMenuItem(item.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                            <Typography variant="h6" color="primary">
                                                No menu items available
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Click the Add Menu Item button to add your first menu item
                                            </Typography>
                                            <Button 
                                                variant="contained" 
                                                color="primary" 
                                                onClick={() => navigate("/admin/restaurants/add-menu")}
                                                startIcon={<CreateIcon />}
                                            >
                                                Add Menu Item
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};