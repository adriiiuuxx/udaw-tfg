import React from 'react'
import { ProfileNavigation } from './ProfileNavigation'
import { Route, Routes } from 'react-router-dom';
import { UserProfile } from './UserProfile';
import { Address } from './Address';
import { Favorites } from './Favorites';
import { Orders } from './Orders';

export const Profile = () => {
    const [openSidebar] = React.useState(false);
  return (
    <div className='lg:flex justify-between'>
        <div className='sticky h-[80vh] lg:w-[20%]'>
            <ProfileNavigation open={openSidebar}/>
        </div>
        <div className='lg:w-[80%]'>
          <Routes>
              <Route path='/' element={<UserProfile/>}/>
              <Route path='/orders' element={<Orders/>}/>
              <Route path='/favorites' element={<Favorites/>}/>
              <Route path='/addresses' element={<Address/>}/>
            </Routes> 
        </div>
    </div>
  )
}
