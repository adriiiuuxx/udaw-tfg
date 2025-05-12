import { Divider, Modal, Box, Button, Card, TextField, Typography, CircularProgress, Snackbar, Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CartItem } from './CartItem'
import { AddressCard } from './AddressCard'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../State/Orders/action';
import { getUserAddresses, createAddress } from '../../State/Address/action';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: 'none',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};
const initialValues = {
    street: "",
    city: "",
    state: "",
    zipCode: ''
}
const validationSchema = Yup.object().shape({
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.number().required("Zip code is required")
})

export const Cart = () => {
    // Select only the specific parts of the state that we need
    const cart = useSelector(state => state.cart);
    const address = useSelector(state => state.address);
    const [open, setOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if (jwt) {
            dispatch(getUserAddresses(jwt));
        }
    }, [dispatch, jwt]);

    const handleOpenAddressModal = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
    };

    const handleCloseSnackbar = () => {
        setSnackbar({
            ...snackbar,
            open: false
        });
    };

    const handleSubmit = async (values) => {
        try {
            // Create a new address if needed
            let addressId = selectedAddress?.id;
            
            if (!addressId) {
                // Create new address first
                const newAddress = await dispatch(createAddress(values, jwt));
                if (newAddress) {
                    addressId = newAddress.id;
                    setSnackbar({
                        open: true,
                        message: 'New address created successfully',
                        severity: 'success'
                    });
                }
            }
            
            // Create the order with the address ID
            const data = {
                jwt: jwt,
                order: {
                    restaurantId: cart.cartItems[0].food?.restaurant.id,
                    deliveryAddressId: addressId
                }
            };
            
            await dispatch(createOrder(data));
            setSnackbar({
                open: true,
                message: 'Order placed successfully',
                severity: 'success'
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Error: ' + (error.message || 'Something went wrong'),
                severity: 'error'
            });
        }
    };

    if (!cart.cart) {
        return <p>Loading cart...</p>;
    }

    return (
        <div>
            {/* Snackbar for notifications */}
            <Snackbar 
                open={snackbar.open} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity} 
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
            
            <main className='lg:flex justify-between'>
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                    {cart.cartItems.map((item) => <CartItem key={item.id} item={item} />)}
                    <Divider />
                    <div className='billDetails px-5 text-sm'>
                        <p className='font-extralight py-5'>Bill Details</p>
                        <div className='space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Item total</p>
                                <p>{cart.cart.total}€</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Delivery Fee</p>
                                <p>2€</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Restaurant Charges</p>
                                <p>2€</p>
                            </div>
                            <Divider />
                            <div className='flex justify-between text-gray-400 mt-1'>
                                <p>Total Amount</p>
                                <p>{cart.cart.total + 4}€</p>
                            </div>
                        </div>
                        
                        {selectedAddress && (
                            <div className='mt-6'>
                                <Divider className='mb-3' />
                                <p className='font-extralight text-gray-400 mb-2'>Delivery Address</p>
                                <div className='space-y-1'>
                                    <div className='flex justify-between text-gray-400'>
                                        <p>Street:</p>
                                        <p>{selectedAddress.street}</p>
                                    </div>
                                    <div className='flex justify-between text-gray-400'>
                                        <p>City:</p>
                                        <p>{selectedAddress.city}</p>
                                    </div>
                                    <div className='flex justify-between text-gray-400'>
                                        <p>State, Postal Code:</p>
                                        <p>{selectedAddress.state}, {selectedAddress.zipCode}</p>
                                    </div>
                                </div>
                                <div className='flex justify-end mt-2'>
                                    <Button 
                                        variant='text' 
                                        color='primary' 
                                        size='small'
                                        onClick={() => setSelectedAddress(null)}
                                    >
                                        Change
                                    </Button>
                                </div>
                            </div>
                        )}
                        
                        {selectedAddress && (
                            <Button
                                variant='contained'
                                color='primary'
                                fullWidth
                                className='mt-4'
                                onClick={() => handleSubmit({})}
                            >
                                Place Order
                            </Button>
                        )}
                    </div>
                </section>
                <Divider orientation='vertical' flexItem />
                <section className='lg:w-[70%] px-5 pb-10 lg:pb-0'>
                    <h1 className='text-center font-semibold text-2xl py-10'>Select Address</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr'>
                        {/* Add New Address Card */}
                        <Card className='w-full p-5 h-full'>
                            <div className='flex gap-5'>
                                <AddLocationAltIcon className='text-blue-500' />
                                <div className='space-y-3 text-gray-500'>
                                    <h1 className='font-semibold text-lg text-white'>Add New Address</h1>
                                    <p>Add a new delivery address with complete details</p>
                                    <Button
                                        variant='outlined'
                                        fullWidth
                                        onClick={handleOpenAddressModal}
                                    >
                                        Add New
                                    </Button>
                                </div>
                            </div>
                        </Card>
                        
                        {/* Saved Addresses */}
                        {address.loading ? (
                            <div className='flex justify-center items-center'>
                                <CircularProgress size={24} />
                            </div>
                        ) : (
                            address.addresses.map((addr) => (
                                <AddressCard 
                                    key={addr.id} 
                                    item={addr} 
                                    showButton 
                                    handleSelectAddress={handleSelectAddress} 
                                />
                            ))
                        )}
                    </div>
                </section>
            </main>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="flex flex-col space-y-4">
                                    <div>
                                        <Field
                                            as={TextField}
                                            name="street"
                                            label="Street"
                                            fullWidth
                                            variant="outlined"
                                            error={touched.street && errors.street}
                                            helperText={
                                                <ErrorMessage name="street">
                                                    {msg => <span style={{ color: 'red' }}>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            as={TextField}
                                            name="city"
                                            label="City"
                                            fullWidth
                                            variant="outlined"
                                            error={touched.city && errors.city}
                                            helperText={
                                                <ErrorMessage name="city">
                                                    {msg => <span style={{ color: 'red' }}>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            as={TextField}
                                            name="state"
                                            label="State"
                                            fullWidth
                                            variant="outlined"
                                            error={touched.state && errors.state}
                                            helperText={
                                                <ErrorMessage name="state">
                                                    {msg => <span style={{ color: 'red' }}>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            as={TextField}
                                            name="zipCode"
                                            label="Zip Code"
                                            fullWidth
                                            variant="outlined"
                                            error={touched.zipCode && errors.zipCode}
                                            helperText={
                                                <ErrorMessage name="zip_code">
                                                    {msg => <span style={{ color: 'red' }}>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            color="primary"
                                            fullWidth
                                        >
                                            Deliver Here
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </div>
    );
};
