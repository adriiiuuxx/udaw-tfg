import React from 'react'
import { useNavigate } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../State/Authentication/action';

const menu = [
    { title: "Orders", icon: <ShoppingBagIcon /> },
    { title: "Favorites", icon: <FavoriteIcon /> },
    { title: "Addresses", icon: <LocationOnIcon /> },
    { title: "Payments", icon: <AccountBalanceWalletIcon /> },
    { title: "Notifications", icon: <NotificationsActiveIcon /> },
    { title: "Logout", icon: <LogoutIcon /> }
]

export const ProfileNavigation = ({ open, handleClose }) => {
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            dispatch(logout(navigate));
        } else{

            navigate(`/my-profile/${item.title.toLowerCase()}`);
        }
    }
    return (
        <div>
            <Drawer
                variant={isSmallScreen ? "temporary" : "permanent"}
                anchor='left'
                open={open}
                sx={{ 
                    zIndex: 1000,
                    '& .MuiDrawer-paper': {
                        marginTop: '64px',
                        height: 'calc(100% - 64px)',
                        padding: '2rem 0' 
                    }
                }}
                onClose={handleClose}>

                <div className='w-[50vw] lg:w-[20vw] flex flex-col text-xl'>
                    {menu.map((item, i) => (
                        <React.Fragment key={i}>
                            <div onClick={() => handleNavigate(item)} className='px-5 py-3 flex items-center space-x-5 cursor-pointer hover:bg-gray-900 rounded-md'>
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                            {i !== menu.length - 1 && <Divider sx={{ my: 1 }} />} 
                        </React.Fragment>
                    ))}
                </div>
            </Drawer>
        </div>
    )
}