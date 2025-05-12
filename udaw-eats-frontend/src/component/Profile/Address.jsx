import React, { useEffect, useState } from 'react'
import { AddressCard } from '../Cart/AddressCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAddresses, createAddress, updateAddress, deleteAddress } from '../../State/Address/action'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Snackbar, Alert } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import AddIcon from '@mui/icons-material/Add'

const addressValidationSchema = Yup.object().shape({
  street: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string().required('Zip code is required')
})

export const Address = () => {
  const dispatch = useDispatch()
  const { addresses, loading } = useSelector(state => state.address)
  const jwt = localStorage.getItem('jwt')
  const [openAddressModal, setOpenAddressModal] = useState(false)
  const [editAddress, setEditAddress] = useState(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  useEffect(() => {
    if (jwt) {
      dispatch(getUserAddresses(jwt))
    }
  }, [dispatch, jwt])

  const handleOpenAddressModal = (address = null) => {
    setEditAddress(address)
    setOpenAddressModal(true)
  }

  const handleCloseAddressModal = () => {
    setEditAddress(null)
    setOpenAddressModal(false)
  }

  const handleAddressSubmit = async (values) => {
    try {
      if (editAddress) {
        // Update existing address
        await dispatch(updateAddress(editAddress.id, values, jwt))
        setSnackbar({
          open: true,
          message: 'Address updated successfully',
          severity: 'success'
        })
      } else {
        // Create new address
        await dispatch(createAddress(values, jwt))
        setSnackbar({
          open: true,
          message: 'Address added successfully',
          severity: 'success'
        })
      }
      handleCloseAddressModal()
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Error: ' + (err.message || 'Something went wrong'),
        severity: 'error'
      })
    }
  }

  const handleDeleteAddress = async (address) => {
    try {
      const result = await dispatch(deleteAddress(address.id, jwt))
      
      if (result.success) {
        setSnackbar({
          open: true,
          message: 'Address deleted successfully',
          severity: 'success'
        })
      } else {
        // Check if the address is used in orders
        if (result.isUsedInOrders) {
          setSnackbar({
            open: true,
            message: 'This address cannot be deleted because it is used in one or more orders',
            severity: 'warning'
          })
        } else {
          setSnackbar({
            open: true,
            message: 'Error: ' + (result.error || 'Something went wrong'),
            severity: 'error'
          })
        }
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Error: ' + (err.message || 'Something went wrong'),
        severity: 'error'
      })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    })
  }

  const initialValues = editAddress || {
    street: '',
    city: '',
    state: '',
    zipCode: ''
  }

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <Typography variant="h5" component="h2" className="font-bold">
          My Addresses
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenAddressModal()}
        >
          Add New Address
        </Button>
      </div>
      
      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {loading ? (
        <Typography>Loading addresses...</Typography>
      ) : addresses.length === 0 ? (
        <Typography className="text-center py-10 text-gray-500">
          You don't have any saved addresses yet. Add a new address to get started.
        </Typography>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {addresses.map((address) => (
            <div key={address.id}>
              <AddressCard 
                item={address} 
                showActions 
                onEdit={() => handleOpenAddressModal(address)} 
                onDelete={() => handleDeleteAddress(address)} 
              />
            </div>
          ))}
        </div>
      )}

      {/* Address Form Dialog */}
      <Dialog open={openAddressModal} onClose={handleCloseAddressModal} maxWidth="sm" fullWidth>
        <DialogTitle>{editAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={addressValidationSchema}
          onSubmit={handleAddressSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogContent>
                <div className="flex flex-col space-y-4">
                  <div className="w-full">
                    <Field
                      as={TextField}
                      name="street"
                      label="Street Address"
                      fullWidth
                      variant="outlined"
                      error={touched.street && Boolean(errors.street)}
                      helperText={
                        <ErrorMessage name="street">
                          {msg => <span style={{ color: 'red' }}>{msg}</span>}
                        </ErrorMessage>
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Field
                        as={TextField}
                        name="city"
                        label="City"
                        fullWidth
                        variant="outlined"
                        error={touched.city && Boolean(errors.city)}
                        helperText={
                          <ErrorMessage name="city">
                            {msg => <span style={{ color: 'red' }}>{msg}</span>}
                          </ErrorMessage>
                        }
                      />
                    </div>
                    <div>
                      <Field
                        as={TextField}
                        name="state"
                        label="State"
                        fullWidth
                        variant="outlined"
                        error={touched.state && Boolean(errors.state)}
                        helperText={
                          <ErrorMessage name="state">
                            {msg => <span style={{ color: 'red' }}>{msg}</span>}
                          </ErrorMessage>
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <Field
                      as={TextField}
                      name="zipCode"
                      label="Zip Code"
                      fullWidth
                      variant="outlined"
                      error={touched.zipCode && Boolean(errors.zipCode)}
                      helperText={
                        <ErrorMessage name="zipCode">
                          {msg => <span style={{ color: 'red' }}>{msg}</span>}
                        </ErrorMessage>
                      }
                    />
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAddressModal} color="primary">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  {editAddress ? 'Update' : 'Save'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  )
}
