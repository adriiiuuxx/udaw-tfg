import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient } from '../../State/Ingredients/action';

export const CreateIngredientForm = () => {

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {ingredients, restaurant } = useSelector((store) => store)

    const [formData, setFormData] = useState({
        name: "",
        categoryId: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            restaurantId: restaurant.usersRestaurant.id
        };
        console.log(data);
        dispatch(createIngredient({ data, jwt }));

    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value

        })
    }

    return (
        <div>
            <div className='p-5'>
                <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Ingredient Name"
                            variant="outlined"
                            onChange={handleInputChange}
                            value={formData.name}
                        />
                    </div>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="categoryId"
                                id="categoryId"
                                value={formData.categoryId}
                                label="Category"
                                onChange={handleInputChange}
                                name='categoryId'
                            >
                               {ingredients.category.map((item) =>  <MenuItem value={item.id}>{item.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <Button variant="contained" type="submit">
                            Create Ingredient
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
