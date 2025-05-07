import { Avatar, Box, Card, CardHeader, Chip, IconButton } from '@mui/material'
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

export const MenuTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { menu, restaurant } = useSelector((store) => store);

    useEffect(() => {
        dispatch(getMenuItemsByRestaurantId({
            restaurantId: restaurant.usersRestaurant.id,
            jwt,
            vegetarian: false,
            nonVegetarian: false,
            foodCategory: ""
        }));
    }, [dispatch, restaurant.usersRestaurant.id, jwt]);

    const handleDeleteMenuItem = (id) => {
        dispatch(deleteFood({ foodId: id, jwt }));
    };

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
                            {menu.menuItems.map((item) => (
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
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};