import { Button, Card } from '@mui/material';
import React from 'react';

export const OrderCard = ({ order }) => {

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

    const statusStyles = getStatusStyles(order.orderStatus);

    const formattedDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    return (
        <Card
            className='flex flex-col p-5 space-y-5 rounded-lg shadow-md'
            style={{
                backgroundColor: '#0D0D0D',
                color: '#e0e0e0',
            }}
        >
            {/* Order Summary */}
            <div className='flex justify-between items-center border-b pb-3 border-gray-700'>
                <div className='space-y-1'>
                    <p className='text-lg font-semibold text-primary'>
                        Order ID: {order.id}
                    </p>
                    <p className='text-sm text-gray-400'>
                        Total Price: <span className='font-medium'>{order.totalPrice}€</span>
                    </p>
                    <p className='text-sm text-gray-400'>
                        Total Items: <span className='font-medium'>{order.totalItem}</span>
                    </p>
                    <p className='text-sm text-gray-400'>
                        Date: <span className='font-medium'>{formattedDate}</span>
                    </p>
                </div>
                <Button
                    size='small'
                    style={{
                        backgroundColor: statusStyles.backgroundColor,
                        color: '#fff',
                        textTransform: 'capitalize',
                    }}
                >
                    {statusStyles.label}
                </Button>
            </div>

            {/* Order Items */}
            <div className='space-y-3'>
                <p className='text-md font-semibold text-gray-300'>Items:</p>
                {order.items.map((item) => (
                    <div
                        key={item.id}
                        className='flex items-center space-x-4 p-3 rounded-md'
                        style={{
                            backgroundColor: '#1A1A1A',
                        }}
                    >
                        <img
                            className='w-16 h-16 object-cover rounded-md border border-gray-700'
                            src={item.food.images[0]}
                            alt={item.food.name}
                        />
                        <div className='flex-1'>
                            <p className='text-sm font-medium text-gray-200'>
                                {item.food.name}
                            </p>
                            <p className='text-sm text-gray-400'>Quantity: {item.quantity}</p>
                            <p className='text-sm text-gray-400'>Price: {item.totalPrice}€</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};