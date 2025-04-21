import { Divider, Modal, Box, Button, Card, Grid, TextField } from '@mui/material'
import React from 'react'
import { CartItem } from './CartItem'
import { AddressCard } from './AddressCard'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../State/Orders/action';

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
    const createOrderUsingSelectedAddress = () => {

    };
    const { cart } = useSelector(store => store)
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleOpenAddressModal = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleSubmit = (values) => {
        const data = {
            jwt: localStorage.getItem("jwt"),
            order: {
                restaurantId: cart.cartItems[0].food?.restaurant.id,
                deliveryAddress: {
                    street: values.street,
                    city: values.city,
                    state: values.state,
                    zipCode: values.zipCode

                }
            }
        }
        dispatch(createOrder(data))
    };

    if (!cart.cart) {
        return <p>Loading cart...</p>;
    }

    return (
        <div>
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
                    </div>
                </section>
                <Divider orientation='vertical' flexItem />
                <section className='lg:w-[70%] px-5 pb-10 lg:pb-0'>
                    <h1 className='text-center font-semibold text-2xl py-10'>Choose Delivery Address</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr'>
                        {[1].map((item, index) => (
                            <AddressCard
                                key={index}
                                handleSelectAddress={createOrderUsingSelectedAddress}
                                item={item}
                                showButton={true}
                                className="h-full"
                            />
                        ))}
                        <Card className='w-full p-5 h-full'>
                            <div className='flex gap-5'>
                                <AddLocationAltIcon />
                                <div className='space-y-3 text-gray-500'>
                                    <h1 className='font-semibold text-lg text-white'>Add New Address</h1>
                                    <p>&nbsp;</p>
                                    <Button
                                        variant='outlined'
                                        fullWidth
                                        onClick={handleOpenAddressModal}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </Card>
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
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
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
                                    </Grid>
                                    <Grid item xs={12}>
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
                                    </Grid>
                                    <Grid item xs={12}>
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
                                    </Grid>
                                    <Grid item xs={12}>
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
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            color="primary"
                                            fullWidth
                                        >
                                            Deliver Here
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </div>
    );
};
