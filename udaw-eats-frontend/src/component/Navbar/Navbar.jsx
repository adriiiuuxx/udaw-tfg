import { Avatar, Badge, IconButton, useMediaQuery, TextField, InputAdornment, Paper, List, ListItem, ListItemText, ListItemAvatar, CircularProgress, ClickAwayListener } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useRef } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Navbar.css"
import { Person, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react'
import { findCart } from '../../State/Cart/action';
import { getRestaurantByUser } from '../../State/Restaurant/action';
import { searchRestaurant } from '../../State/Restaurant/action';
import MenuIcon from '@mui/icons-material/Menu';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export const Navbar = ({ onSidebarOpen, showSidebarButton }) => {
    // Select only the specific parts of the state that we need
    const auth = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery("(max-width:900px)");
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef(null);

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

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (query.trim().length >= 2) {
            setIsSearching(true);
            try {
                const results = await dispatch(searchRestaurant({ keyword: query, jwt }));
                setSearchResults(results || []);
            } catch (error) {
                console.error('Error searching restaurants:', error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchClick = () => {
        setSearchOpen(!searchOpen);
        if (!searchOpen) {
            setTimeout(() => {
                if (searchRef.current) {
                    searchRef.current.focus();
                }
            }, 100);
        } else {
            setSearchQuery('');
            setSearchResults([]);
        }
    };

    const handleRestaurantClick = (restaurant) => {
        navigate(`/restaurant/${restaurant.name}/${restaurant.id}`);
        setSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleClickAway = () => {
        if (searchOpen) {
            setSearchOpen(false);
            setSearchQuery('');
            setSearchResults([]);
        }
    };

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
                <li onClick={() => navigate("/")} className="logo font-semibold text-gray-300 text-2x1"> UDAW EATS</li>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-10">
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div className="relative">
                        {searchOpen ? (
                            <div className="flex items-center bg-white rounded-md">
                                <TextField
                                    inputRef={searchRef}
                                    placeholder="Search restaurants..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    variant="outlined"
                                    size="small"
                                    sx={{ 
                                        minWidth: '250px',
                                        '& .MuiInputBase-input': {
                                            color: '#333',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#ccc',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#999',
                                            },
                                        },
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton size="small" onClick={handleSearchClick}>
                                                    <Close />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                {(searchResults.length > 0 || isSearching) && (
                                    <Paper 
                                        className="absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-auto" 
                                        elevation={3}
                                    >
                                        {isSearching ? (
                                            <div className="flex justify-center p-4">
                                                <CircularProgress size={24} />
                                            </div>
                                        ) : (
                                            <List>
                                                {searchResults.map((restaurant) => (
                                                    <ListItem 
                                                        key={restaurant.id} 
                                                        button 
                                                        onClick={() => handleRestaurantClick(restaurant)}
                                                        className="hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        <ListItemAvatar>
                                                            {restaurant.images && restaurant.images.length > 0 ? (
                                                                <Avatar src={restaurant.images[0]} alt={restaurant.name} />
                                                            ) : (
                                                                <Avatar>
                                                                    <RestaurantIcon />
                                                                </Avatar>
                                                            )}
                                                        </ListItemAvatar>
                                                        <ListItemText 
                                                            primary={restaurant.name} 
                                                            secondary={restaurant.cuisineType || 'Restaurant'} 
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        )}
                                    </Paper>
                                )}
                            </div>
                        ) : (
                            <IconButton onClick={handleSearchClick}>
                                <SearchIcon sx={{ fontSize: "1.5rem" }} />
                            </IconButton>
                        )}
                    </div>
                </ClickAwayListener>
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