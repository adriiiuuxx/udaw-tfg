import React from 'react'
import { Button, Card } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';

export const AddressCard = ({ item, showButton, handleSelectAddress }) => {
  return (
    <Card className='w-full p-5 h-full'>
      <div className='flex gap-5'>
        <HomeIcon />
        <div className='space-y-3 text-gray-500'>
          <h1 className='font-semibold text-lg text-white'>Home</h1>
          <p>A Coruña, Avda. Concordia 9, 15009</p>
          {showButton && (
            <Button
              variant='outlined'
              fullWidth
              onClick={() => handleSelectAddress(item)}
            >
              Select
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}