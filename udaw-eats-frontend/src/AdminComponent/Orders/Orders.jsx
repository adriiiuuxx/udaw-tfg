import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';
import React, { useState } from 'react'
import { OrderTable } from './OrderTable';

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Out for Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "All", value: "ALL" }
]

export const Orders = () => {
  const [filterValue, setFilterValue] = useState("ALL");
  
  const handleFilter = (e, value) => {
    setFilterValue(value);
  }
  
  return (
    <div className='px-2'>
      <Card className='p-5'>
        <Typography sx={{ paddingBottom: "1rem" }} variant='h5'>
          Filter by Order Status
        </Typography>
        <FormControl>
          <RadioGroup 
            onChange={handleFilter} 
            row 
            name='orderStatus' 
            value={filterValue}
          >
            {orderStatus.map((item) => (
              <FormControlLabel
                key={item.label}
                value={item.value}
                control={<Radio />}
                label={item.label}
                sx={{ color: grey }} 
              />
            ))}

          </RadioGroup>
        </FormControl>
      </Card>

      <OrderTable filterStatus={filterValue} />
    </div>
  )
}
