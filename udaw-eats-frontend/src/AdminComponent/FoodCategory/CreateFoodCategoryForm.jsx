import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../State/Restaurant/action';

export const CreateFoodCategoryForm = ({ onSuccess }) => {
    // We still need the restaurant ID for logging purposes
    // Select only the specific part of the state that we need
    const restaurant = useSelector(state => state.restaurant);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Let the backend handle ID generation
        const data = {
            name: formData.categoryName
            // The restaurant will be set on the backend based on the JWT
        };
        
        try {
            console.log('Sending category data:', data, 'for restaurant:', restaurant.usersRestaurant?.id);
            await dispatch(createCategory({
                reqData: data,
                jwt: jwt
            }));
            
            // Reset form
            setFormData({ categoryName: "", restaurantId: "" });
            
            // Call the onSuccess callback to close the modal and show notification
            if (onSuccess) {
                onSuccess(`Food category ${formData.categoryName} created successfully`);
            }
        } catch (error) {
            /* console.error('Error creating food category:', error); */
            if (onSuccess) {
                onSuccess(`Error creating category: ${error.message}`, 'error');
            }
        }
    };

    const [formData, setFormData] = useState({ categoryName: "", restaurantId: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value

        })
    }

    return (
        <div>
            <div className='p-5'>
                <h1 className='text-gray-400 text-center text-xl pb-10'>Create Food Category</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            fullWidth
                            id="categoryName"
                            name="categoryName"
                            label="Category Name"
                            variant="outlined"
                            onChange={handleInputChange}
                            value={formData.categoryName}
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
