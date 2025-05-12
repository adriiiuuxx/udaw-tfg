/**
 * @fileoverview Order Table Component
 * 
 * This file contains the OrderTable component, which displays and manages all orders for a restaurant.
 * It provides functionality to view order details and update order status through a dropdown menu.
 * 
 * The component includes:
 * - A table displaying order information (ID, customer, items, price, status)
 * - Status indicators with color coding for different order states
 * - A dropdown menu to update order status
 * - Empty state handling when no orders are available
 * 
 * @requires @mui/material
 * @requires react
 * @requires react-redux
 * @requires ../../State/Restaurant Orders/action
 */
/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, AvatarGroup, Box, Card, CardHeader, Chip, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRestaurantOrders, updateOrderStatus } from '../../State/Restaurant Orders/action';
import { Button, Menu, MenuItem } from '@mui/material';

const orderStatus = [
    { label: "Pending", value: "PENDING" },
    { label: "Out for Delivery", value: "OUT_FOR_DELIVERY" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Completed", value: "COMPLETED" }
];

/**
 * Determines the visual styling for different order status values
 * 
 * This function maps order status values to their corresponding visual representations,
 * including background color and display label. This creates a consistent visual language
 * for order status throughout the application.
 * 
 * @param {string} status - The current status of the order (PENDING, OUT_FOR_DELIVERY, DELIVERED, COMPLETED)
 * @returns {Object} An object containing backgroundColor and label properties
 */
const getStatusStyles = (status) => {
    switch (status) {
        case 'PENDING':
            return { backgroundColor: '#e91e63', label: 'Pending' };
        case 'OUT_FOR_DELIVERY':
            return { backgroundColor: '#ff9800', label: 'Out for Delivery' };
        case 'DELIVERED':
            return { backgroundColor: '#4caf50', label: 'Delivered' };
        case 'COMPLETED':
            return { backgroundColor: '#2196f3', label: 'Completed' };
        default:
            return { backgroundColor: '#9e9e9e', label: 'Unknown' };
    }
};

/**
 * OrderTable Component
 * 
 * Displays a table of restaurant orders with functionality to filter and update order status.
 * The component fetches orders based on the restaurant ID from the Redux store and the optional
 * filterStatus parameter.
 * 
 * When there are no orders to display, it shows a helpful message to the restaurant owner.
 * 
 * @param {Object} props - Component props
 * @param {string} props.filterStatus - Optional filter to show only orders with a specific status
 * @returns {JSX.Element} The rendered OrderTable component
 */
export const OrderTable = ({ filterStatus }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    // Select only the specific parts of the state that we need
    const restaurantOrder = useSelector(state => state.restaurantOrder);
    const restaurant = useSelector(state => state.restaurant);

    useEffect(() => {
        if (restaurant.usersRestaurant && restaurant.usersRestaurant.id && jwt) {
            dispatch(getRestaurantOrders({
                restaurantId: restaurant.usersRestaurant.id,
                orderStatus: filterStatus !== "ALL" ? filterStatus : null,
                jwt
            }));
        }
    }, [dispatch, restaurant.usersRestaurant?.id, jwt, filterStatus]);

    // Use an object to track menu state for each order separately
    const [menuState, setMenuState] = React.useState({
        anchorEl: null,
        orderId: null
    });
    const open = Boolean(menuState.anchorEl);
    /**
     * Opens the order status update dropdown menu
     * 
     * @param {React.MouseEvent} event - The click event that triggered the menu opening
     */
    const handleClick = (event, orderId) => {
        setMenuState({
            anchorEl: event.currentTarget,
            orderId: orderId
        });
    };
    /**
     * Closes the order status update dropdown menu
     */
    const handleClose = () => {
        setMenuState({
            anchorEl: null,
            orderId: null
        });
    };

    /**
     * Updates the status of an order and closes the dropdown menu
     * 
     * This function dispatches the updateOrderStatus action to the Redux store,
     * which makes an API call to update the order status in the backend.
     * 
     * @param {number} orderId - The ID of the order to update
     * @param {string} orderStatus - The new status to set for the order
     */
    const handleUpdateOrderStatus = (orderId, orderStatus) => {
        dispatch(updateOrderStatus({ orderId, orderStatus, jwt }))
        handleClose();
    }

    return (
        <Box>
            <Card className='mt-2'>
                <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Image</TableCell>
                                <TableCell align="right">Customer</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="center">Ingredients</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurantOrder.orders && restaurantOrder.orders.length > 0 ? (
                                // Sort orders by createdAt date in descending order (newest first)
                                [...restaurantOrder.orders]
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .map((item) => (
                                    <TableRow
                                        key={item.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.id}
                                        </TableCell>
                                    <TableCell align="right">
                                        <AvatarGroup>
                                            {item.items.map((orderItem, idx) => (
                                                <Avatar key={idx} alt="img" src={orderItem.food?.images[0]} />
                                            ))}
                                        </AvatarGroup>
                                    </TableCell>
                                    <TableCell align="right">{item.customer?.email}</TableCell>
                                    <TableCell align="right">{item?.totalPrice}€</TableCell>
                                    <TableCell align="right">
                                        {item.items.map((orderItem, idx) => <p key={idx}>{orderItem.food?.name}</p>)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {item.items.map((orderItem, idx) =>
                                                <React.Fragment key={idx}>
                                                    {orderItem.ingredients.map((ingredient, i) =>
                                                        <Chip key={i} label={ingredient} />
                                                    )}
                                                </React.Fragment>
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            size="small"
                                            style={{
                                                backgroundColor: getStatusStyles(item.orderStatus).backgroundColor,
                                                color: '#fff',
                                                textTransform: 'capitalize',
                                                minWidth: 120
                                            }}
                                            disabled
                                        >
                                            {getStatusStyles(item.orderStatus).label}
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            id="demo-positioned-button"
                                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={(e) => handleClick(e, item.id)}
                                        >
                                            Update
                                        </Button>
                                        <Menu
                                            id="demo-positioned-menu"
                                            aria-labelledby="demo-positioned-button"
                                            anchorEl={menuState.anchorEl}
                                            // Only show this menu for the current order
                                            open={open && menuState.orderId === item.id}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            {orderStatus.map((status) => (
                                                <MenuItem key={status.value} onClick={() => handleUpdateOrderStatus(item.id, status.value)}>
                                                    {status.label}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                            <Typography variant="h6" color="primary">
                                                No orders available
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Orders will appear here when customers place them
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    )
}