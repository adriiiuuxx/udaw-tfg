import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../State/Authentication/action';
import { useNavigate } from 'react-router-dom';

export const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Select only the specific part of the state that we need
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
      dispatch(logout(navigate));
  }

  return (
      <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
          <div className='flex flex-col justify-center items-center'>
              <AccountCircleIcon sx={{ fontSize: "9rem" }}/>
              <h1 className='py-5 text-2xl font-semibold'>{user?.fullName || 'User'}</h1>
              <p>Email: {user?.email || 'email@example.com'}</p>
              <Button 
                  variant='contained' 
                  onClick={handleLogout} 
                  sx={{margin: "2rem 0rem"}}
              >
                  Logout
              </Button>
          </div>
      </div>
  )
}
