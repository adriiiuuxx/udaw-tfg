import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../State/Restaurant/action';

export const CreateFoodCategoryForm = () => {
    const { restaurant } = useSelector((store) => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: formData.categoryName,
            restaurantId: {
                id: restaurant.usersRestaurant?.id,
            },
        };
        dispatch(createCategory({
            reqData: data,
            jwt: jwt
        }));
        console.log(data);

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
