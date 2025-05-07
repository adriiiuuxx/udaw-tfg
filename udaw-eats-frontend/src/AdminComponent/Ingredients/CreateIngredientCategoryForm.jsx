import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredientCategory } from '../../State/Ingredients/action';

export const CreateIngredientCategoryForm = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector((store) => store)

    const [formData, setFormData] = useState({ name: "" });

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: formData.name,
            restaurantId: restaurant.usersRestaurant.id
        };
        console.log(formData);

        dispatch(createIngredientCategory({ data, jwt }));
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
