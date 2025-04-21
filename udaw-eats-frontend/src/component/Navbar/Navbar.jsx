import { Avatar, Badge, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Navbar.css"
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react'
import { findCart} from '../../State/Cart/action';

export const Navbar = () => {
    const { auth, cart } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAvatarClick = () => {
        if (auth.user.role === "ROLE_CUSTOMER") {
            navigate("/my-profile")
        } else {
            navigate("/admin/restaurant")
        }
    }

      useEffect(() => {
        dispatch(findCart(jwt));
      }, [dispatch, jwt]);

    return (
        <div className=' relative px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px20 flex 
        justify-between'>
            <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">

                <li onClick={() => navigate("/")}  className="logo font-semibold text-gray-300 text-2x1"> UDAW-EATS</li>

            </div>


            <div className="flex items-center space-x-2 lg:space-x-10">

                <div className="">
                    <IconButton>
                        <SearchIcon sx={{ fontSize: "1.5rem" }} />
                    </IconButton>
                </div>
                <div className="cursor-pointer">
                    {auth.user ? <Avatar onClick={handleAvatarClick} sx={{ bgcolor: "white", color: "pink.A400" }}> {auth.user.fullName[0].toUpperCase()} </Avatar> :
                        <IconButton onClick={() => navigate("/account/login")}>
                            <Person />
                        </IconButton>}
                </div>

                <div className="">
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