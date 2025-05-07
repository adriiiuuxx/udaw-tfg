/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, AvatarGroup, Box, Card, CardHeader, Chip } from '@mui/material'
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

export const OrderTable = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurantOrder, restaurant } = useSelector((store) => store);

    useEffect(() => {
        if (restaurant.usersRestaurant && restaurant.usersRestaurant.id && jwt) {
            dispatch(getRestaurantOrders({
                restaurantId: restaurant.usersRestaurant.id,
                jwt
            }));
        }
    }, [dispatch, restaurant.usersRestaurant?.id, jwt]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                            {restaurantOrder.orders.map((item) => (
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
                                            onClick={handleClick}
                                        >
                                            Update
                                        </Button>
                                        <Menu
                                            id="demo-positioned-menu"
                                            aria-labelledby="demo-positioned-button"
                                            anchorEl={anchorEl}
                                            open={open}
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
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    )
}