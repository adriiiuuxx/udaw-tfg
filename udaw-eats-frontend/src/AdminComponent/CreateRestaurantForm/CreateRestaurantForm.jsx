import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import { uploadImageToCloudinary } from '../Admin/Utils/uploadToCloudinary';
import { useDispatch } from 'react-redux';
import { createRestaurant } from '../../State/Restaurant/action';
import * as Yup from "yup";

const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  email: "",
  mobile: "",
  instagram: "",
  openingHours: "Mon-Sun : 09:00 - 00:00",
  images: []
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  cuisineType: Yup.string()
    .required("Cuisine Type is required"),
  street: Yup.string()
    .required("Street is required"),
  city: Yup.string()
    .required("City is required"),
  state: Yup.string()
    .required("Province is required"),
  zipCode: Yup.string()
    .required("Postal Code is required")
    .matches(/^\d{5}$/, "Postal Code must be a 5-digit number"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  mobile: Yup.string()
    .required("Mobile is required")
    .matches(/^\d{9,12}$/, "Mobile must have 9 to 12 digits, with no spaces. Ex: 622786105"),
  instagram: Yup.string()
    .matches(/^@/, "Instagram must start with '@'"),
  openingHours: Yup.string()
    .required("Opening Hours are required"),
});

export const CreateRestaurantForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const formik = useFormik({
    initialValues,
    validationSchema, // Add validation schema here
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
        },
        contactInformation: {
          email: values.email,
          mobile: values.mobile,
          instagram: values.instagram,
        },
        openingHours: values.openingHours,
        images: values.images,
      };
      console.log("data -->", data);

      dispatch(createRestaurant({data,token:jwt}))
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadImage(true);
    try {
      const image = await uploadImageToCloudinary(file);
      formik.setFieldValue("images", [...formik.values.images, image]);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploadImage(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formik.values.images.filter((_, i) => i !== index);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2xl text-center py-2'>Add New Restaurant</h1>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <Grid container spacing={2}>
            <Grid className='flex flex-wrap gap-5' size={{ xs: 12 }}>
              <input
                type="file"
                accept='image/*'
                name="fileInput"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleImageChange} />
              <label className='relative' htmlFor="fileInput">
                <span className='w-24 h-24 cursor-pointer flex items-center justify-center 
                p-3 border rounded-md border-gray-600'>
                  <AddPhotoAlternateIcon className='text-white' />
                </span>
                {
                  uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 
                flex justify-center items-center'>
                    <CircularProgress />
                  </div>
                }
              </label>
              <div className='flex flex-wrap gap-2'>
                {formik.values.images.map((image, index) => (
                  <div className='relative'>
                    <img key={index} className='w-24 h-24 object-cover rounded-md' src={image}
                      alt="img" />
                    <IconButton
                      size='small'
                      sx={{ position: 'absolute', top: 0, right: 0, outline: 'none' }}
                      onClick={() => handleRemoveImage(index)}>
                      <CloseIcon sx={{ fontSize: "1.25rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id="cuisineType"
                name="cuisineType"
                label="Cuisine Type"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cuisineType}
                error={formik.touched.cuisineType && Boolean(formik.errors.cuisineType)}
                helperText={formik.touched.cuisineType && formik.errors.cuisineType}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id="openingHours"
                name="openingHours"
                label="Opening Hours"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.openingHours}
                error={formik.touched.openingHours && Boolean(formik.errors.openingHours)}
                helperText={formik.touched.openingHours && formik.errors.openingHours}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="street"
                name="street"
                label="Street"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.street}
                error={formik.touched.street && Boolean(formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                id="state"
                name="state"
                label="Province"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                id="zipCode"
                name="zipCode"
                label="Postal Code"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.zipCode}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                helperText={formik.touched.zipCode && formik.errors.zipCode}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                label="Mobile"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id="instagram"
                name="instagram"
                label="Instagram"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.instagram}
                error={formik.touched.instagram && Boolean(formik.errors.instagram)}
                helperText={formik.touched.instagram && formik.errors.instagram}
              />
            </Grid>
          </Grid>
          <Button variant='contained' color='primary' type='submit'>Create Restaurant</Button>
        </form>
      </div>
    </div>
  );
};
