import React, { useEffect } from 'react';
import { OrderCard } from './OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../State/Orders/action';

export const Orders = () => {
  // Select only the specific parts of the state that we need
  const auth = useSelector(state => state.auth);
  const order = useSelector(state => state.order);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders(jwt));
  }, [auth.jwt, dispatch, jwt]);

  const sortedOrders = [...order.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>

      <div className='space-y-5 w-full lg:w-1/2'>
        {
          sortedOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        }
      </div>
    </div>
  );
};