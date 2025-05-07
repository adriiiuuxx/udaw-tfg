import { Avatar, Badge, IconButton, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Navbar.css"
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react'
import { findCart } from '../../State/Cart/action';
import { getRestaurantByUser } from '../../State/Restaurant/action';
import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = ({ onSidebarOpen, showSidebarButton }) => {
    const { auth, cart } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery("(max-width:900px)");

    const handleAvatarClick = async () => {
        if (auth.user.role === "ROLE_CUSTOMER") {
            navigate("/my-profile");
        } else if (auth.user.role === "ROLE_RESTAURANT_OWNER") {
            try {
                // Dispatch the action to fetch the user's restaurant
                const restaurantResponse = await dispatch(getRestaurantByUser(jwt));
                // Use the response to navigate
                if (restaurantResponse.payload) {
                    navigate("/admin/restaurants"); // User has a restaurant
                } else {
                    navigate("/admin/restaurants"); // User does not have a restaurant
                }
            } catch (error) {
                console.error("Error checking restaurant:", error);
            }
        }
    };

    useEffect(() => {
        dispatch(findCart(jwt));
    }, [dispatch, jwt]);

    return (
        <div className='relative px-5 z-50 py-[.8rem] bg-[#3f8efc] lg:px20 flex justify-between'>
            <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
                {/* Hamburger button for sidebar (if needed) */}
                {showSidebarButton && isSmallScreen && (
                    <button
                        onClick={onSidebarOpen}
                        style={{
                            marginRight: 16,
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
                <li onClick={() => navigate("/")} className="logo font-semibold text-gray-300 text-2x1"> UDAW-EATS</li>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-10">
                <div>
                    <IconButton>
                        <SearchIcon sx={{ fontSize: "1.5rem" }} />
                    </IconButton>
                </div>
                <div className="cursor-pointer">
                    {auth.user ? (
                        <Avatar onClick={handleAvatarClick} sx={{ bgcolor: "white", color: "pink.A400" }}>
                            {auth.user.fullName[0].toUpperCase()}
                        </Avatar>
                    ) : (
                        <IconButton onClick={() => navigate("/account/login")}>
                            <Person />
                        </IconButton>
                    )}
                </div>
                <div>
                    <IconButton onClick={() => navigate("/cart")}>
                        <Badge color="primary" badgeContent={cart.cart?.items.length}>
                            <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
                        </Badge>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}