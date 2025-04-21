import React from 'react'
import { Box, Modal } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { RegisterForm } from './RegisterForm'
import { LoginForm } from './LoginForm'

export const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleClose = () => {
        navigate(-1);
    }
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
  return (
    <div>
        <Modal open={location.pathname==="/account/register" || location.pathname==="/account/login"} onClose={handleClose}>

            <Box sx={style}> 
                {location.pathname==="/account/register" ? <RegisterForm /> : <LoginForm />}
            </Box>

        </Modal>
    </div>
  )
}
