import React from 'react'
import { Button, Card, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const AddressCard = ({ item, showButton, handleSelectAddress, showActions, onEdit, onDelete }) => {
  return (
    <Card className='w-full p-5 h-full'>
      <div className='flex gap-5'>
        <LocationOnIcon className='text-blue-500' />
        <div className='space-y-3 text-gray-500 flex-grow'>
          <Typography variant='h6' className='font-semibold text-lg text-white'>
            {item?.street || 'Address'}
          </Typography>
          <Typography variant='body2' className='pb-2'>
            {item?.city || 'City'}, {item?.state || 'State'}, {item?.zipCode || 'Zip Code'}
          </Typography>
          
          {showButton && (
            <div className='pt-3'>
              <Button
                variant='outlined'
                fullWidth
                onClick={() => handleSelectAddress(item)}
              >
                Deliver Here
              </Button>
            </div>
          )}
          
          {showActions && (
            <div className='flex gap-2 mt-2'>
              {onEdit && (
                <Button
                  variant='outlined'
                  color='primary'
                  size='small'
                  startIcon={<EditIcon />}
                  onClick={() => onEdit(item)}
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  variant='outlined'
                  color='error'
                  size='small'
                  startIcon={<DeleteIcon />}
                  onClick={() => onDelete(item)}
                >
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}