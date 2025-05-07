import { Dashboard, ShoppingBag } from '@mui/icons-material'
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import EggAltIcon from '@mui/icons-material/EggAlt';
import CategoryIcon from '@mui/icons-material/Category';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react'
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../State/Authentication/action';
import CloseIcon from '@mui/icons-material/Close';

const menu = [
    { title: "Dashboard", icon: <Dashboard />, path: "/" },
    { title: "Orders", icon: <ShoppingBag />, path: "/orders" },
    { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
    { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
    { title: "Ingredients", icon: <EggAltIcon />, path: "/ingredients" },
    { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
    { title: "Logout", icon: <LogoutIcon />, path: "/" },
]

export const AdminSidebar = ({ open, handleClose }) => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            dispatch(logout(navigate));
        } else {
            navigate(`/admin/restaurants${item.path.toLowerCase()}`);
        }
        if (isSmallScreen) handleClose();
    };

    return (
        <Drawer
            open={open}
            onClose={handleClose}
            variant={isSmallScreen ? "temporary" : "permanent"}
            anchor='left'
            sx={{ zIndex: 1 }}
        >
            <div className="w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]">
                {isSmallScreen && (
                    <div className="flex justify-end p-2">
                        <button
                            onClick={handleClose}
                            style={{
                                cursor: 'pointer',
                                background: 'none',
                                border: 'none',
                                padding: 4,
                                borderRadius: '50%',
                                transition: 'background 0.2s'
                            }}
                            onMouseOver={e => e.currentTarget.style.background = '#e3e6ee'}
                            onMouseOut={e => e.currentTarget.style.background = 'none'}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                )}
                {menu.map((item, i) => (
                    <React.Fragment key={item.title}>
                        <div
                            onClick={() => handleNavigate(item)}
                            className="px-5 pt-2 mt-2 flex items-center gap-5 cursor-pointer"
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </div>
                        {i !== menu.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </div>
        </Drawer>
    );
};