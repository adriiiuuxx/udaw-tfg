import React from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { green } from '@mui/material/colors';
import { Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const PaymentSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen px-5'>
            <div className='flex flex-col items-center justify-center h-[90vh]'>
                <Card className='box w-full lg:w-1/4 flex flex-col items-center rounded-md p-5'>
                    <div className='flex items-center justify-center w-full'>
                        <TaskAltIcon sx={{ fontSize: "5rem", color: green[500] }} />
                    </div>
                    <h1 className='py-5 text-2xl font-semibold text-center'>Order was created successfully!</h1>
                    <p className='py-3 text-center text-gray-400'>Thank you for choosing us!</p>
                    <p className='py-2 text-center text-gray-200 text-lg'>Enjoy it and have a lovely day!</p>
                    {/* Wrap buttons in a flex container */}
                    <div className='flex justify-center gap-4 w-full'>
                        <Button
                            onClick={() => navigate("/")}
                            variant='contained'
                            className='py-5'
                            sx={{ margin: "1rem 0rem" }}
                        >
                            Go to home
                        </Button>
                        <Button
                            onClick={() => navigate("/my-profile/orders")}
                            variant='contained'
                            className='py-5'
                            sx={{ margin: "1rem 0rem" }}
                        >
                            See orders
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};