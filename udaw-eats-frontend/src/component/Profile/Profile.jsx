import React from 'react'
import { ProfileNavigation } from './ProfileNavigation'
import { Route, Routes } from 'react-router-dom';
import { UserProfile } from './UserProfile';
import { Address } from './Address';
import { Favorites } from './Favorites';
import { Orders } from './Orders';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';

export const Profile = () => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const isSmallScreen = useMediaQuery("(max-width:900px)");

    const handleClose = () => setSidebarOpen(false);
    const handleOpen = () => setSidebarOpen(true);

    return (
        <div className='lg:flex justify-between'>
            {/* Hamburger button for small screens */}
            {isSmallScreen && !sidebarOpen && (
                <button
                    onClick={handleOpen}
                    style={{
                        position: 'fixed',
                        top: 16,
                        left: 16,
                        zIndex: 1301,
                        background: '#1976d2',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        padding: 8,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    <MenuIcon fontSize="large" style={{ color: '#fff' }} />
                </button>
            )}
            <div className='sticky h-[80vh] lg:w-[20%]'>
                <ProfileNavigation
                    open={isSmallScreen ? sidebarOpen : true}
                    handleClose={handleClose}
                />
            </div>
            <div className='lg:w-[80%]'>
                <Routes>
                    <Route path='/' element={<UserProfile />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/favorites' element={<Favorites />} />
                    <Route path='/addresses' element={<Address />} />
                </Routes>
            </div>
        </div>
    )
}