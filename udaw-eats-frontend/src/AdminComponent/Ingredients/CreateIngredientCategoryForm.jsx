import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredientCategory } from '../../State/Ingredients/action';

export const CreateIngredientCategoryForm = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    // Select only the specific part of the state that we need
    const restaurant = useSelector(state => state.restaurant)

    const [formData, setFormData] = useState({ name: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name: formData.name,
            restaurantId: restaurant.usersRestaurant.id
        };
        
        try {
            await dispatch(createIngredientCategory({ data, jwt }));
            
            // Reset form
            setFormData({ name: "" });
            
            // Call the onSuccess callback to close the modal and show notification
            if (onSuccess) {
                onSuccess(`Ingredient category ${formData.name} created successfully`);
            }
        } catch (error) {
            /* console.error('Error creating ingredient category:', error); */
            if (onSuccess) {
                onSuccess(`Error creating category: ${error.message}`, 'error');
            }
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value

        })
    }

    return (
        <div>
            <div className='p-5'>
                <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient Category</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Category Name"
                            variant="outlined"
                            onChange={handleInputChange}
                            value={formData.name}
                        />
                    </div>
                    <div>
                        <Button variant="contained" type="submit">
                            Create Category
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
