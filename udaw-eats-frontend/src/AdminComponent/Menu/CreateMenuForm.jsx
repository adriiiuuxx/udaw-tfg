import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import { uploadImageToCloudinary } from '../Admin/Utils/uploadToCloudinary';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../State/Ingredients/action';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMenuItem } from '../../State/Menu/action';

const initialValues = {
    name: "",
    description: "",
    price: 0,
    foodCategory: "",
    isVegetarian: true,
    ingredients: [],
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

    price: Yup.number()
        .typeError("Price must be a number")
        .required("Price is required")
        .positive("Price must be a positive number")
        .max(99999, "Price must not exceed 5 digits"),

    foodCategory: Yup.string()
        .required("Food Category is required"),

    isVegetarian: Yup.boolean()
        .required("Is Vegetarian is required"),

    ingredients: Yup.array()
        .of(Yup.number().required("Ingredient is required"))
        .min(1, "At least one ingredient is required"),

});

export const CreateMenuForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const { ingredients, restaurant } = useSelector((store) => store)


    useEffect(() => {
        dispatch(getIngredients({ id: restaurant.usersRestaurant.id, jwt }));
    }, [dispatch, restaurant.usersRestaurant.id, jwt]);

    const [uploadImage, setUploadImage] = useState(false);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            values.restaurantId = restaurant.usersRestaurant.id;

            try {
                await dispatch(createMenuItem({ menu: values, jwt })); // Dispatch action
                navigate('/admin/restaurants/menu'); // Navigate on success
            } catch (error) {
                console.error("Error creating menu item:", error);
            }
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
                <h1 className='font-bold text-2xl text-center py-2'>Add New Menu Item</h1>
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

                        <Grid xs={12} lg={6}>
                            <TextField
                                fullWidth
                                id="price"
                                name="price"
                                label="Price"
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                                error={formik.touched.price && Boolean(formik.errors.price)}
                                helperText={formik.touched.price && formik.errors.price}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, lg: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Food Category</InputLabel>
                                <Select
                                    labelId="foodCategory"
                                    id="foodCategory"
                                    value={formik.values.foodCategory}
                                    label="Food Category"
                                    onChange={formik.handleChange}
                                    name='foodCategory'
                                >
                                    {restaurant.categories?.map((item) => <MenuItem value={item.id}>{item.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
                                <Select
                                    labelId="ingredients"
                                    id="ingredients"
                                    name="ingredients"
                                    multiple
                                    value={formik.values.ingredients}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((id) => {
                                                const ingredient = ingredients.ingredients.find((item) => item.id === id);
                                                return <Chip key={id} label={ingredient?.name || id} />;
                                            })}
                                        </Box>
                                    )}
                                >
                                    {ingredients.ingredients?.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, lg: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Is Vegetarian</InputLabel>
                                <Select
                                    labelId="isVegetarian"
                                    id="isVegetarian"
                                    value={formik.values.isVegetarian}
                                    label="Is Vegetarian"
                                    onChange={formik.handleChange}
                                    name='isVegetarian'
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button variant='contained' color='primary' type='submit'>Add Menu Item</Button>
                </form>
            </div>
        </div>
    )
}
