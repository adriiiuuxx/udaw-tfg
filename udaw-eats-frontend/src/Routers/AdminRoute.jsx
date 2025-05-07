import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreateRestaurantForm } from '../AdminComponent/CreateRestaurantForm/CreateRestaurantForm';
import { Admin } from '../AdminComponent/Admin/Admin';
import { useSelector, useDispatch } from 'react-redux';
import { getRestaurantByUser } from '../State/Restaurant/action';

export const AdminRoute = () => {
  const dispatch = useDispatch();
  const { usersRestaurant } = useSelector((store) => store.restaurant);
  const { jwt } = useSelector((store) => store.auth);

  useEffect(() => {
    if (jwt) {
      dispatch(getRestaurantByUser(jwt)); // Fetch the user's restaurant
    }
  }, [dispatch, jwt]);

  if (usersRestaurant === undefined) {
    // Show a loading state while fetching data
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={usersRestaurant ? <Admin /> : <CreateRestaurantForm />}
        ></Route>
      </Routes>
    </div>
  );
};