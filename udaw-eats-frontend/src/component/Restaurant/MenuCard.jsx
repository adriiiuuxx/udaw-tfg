import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import { categorizeIngredients } from '../Utils/categorizeIngredients';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../State/Cart/action';
import { useNavigate } from 'react-router-dom';

export const MenuCard = ({ item }) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleCheckboxChange = (ingredient) => {
        if (selectedIngredients.includes(ingredient)) {
            setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient));
        } else {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const handleaddItemToCart = (e) => {
        e.preventDefault();

        const ingredientNames = selectedIngredients.map((ingredient) => ingredient.name);

        const reqData = {
            token: localStorage.getItem("jwt"),
            cartItem: {
                foodId: item.id,
                quantity: 1,
                ingredients: ingredientNames,
            }
        };


        dispatch(addItemToCart(reqData));
    };

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <div className='lg:flex items-center justify-between'>
                    <div className='lg:flex items-center lg:gap-5'>
                        <img className='w-[7rem] h-[7rem] object-cover rounded-t-md mr-2.5' src={item.images[0]} alt="Menu item" />
                    </div>
                    <div className='space-y-1 lg:space-y-5 lg:max-w-2xl '>
                        <p className='font-semibold text-xl'>{item.name}</p>
                        <p>{item.price}€</p>
                        <p className='text-gray-400'>{item.description}</p>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <form onSubmit={handleaddItemToCart}>
                    <div className='flex gap-5 flex-wrap'>
                        {
                            Object.keys(categorizeIngredients(item.ingredients)).map((category) => (
                                <div key={category}>
                                    <p>{category}</p>
                                    <FormGroup>
                                        {categorizeIngredients(item.ingredients)[category].map((ingredient) => (
                                            <FormControlLabel
                                                key={ingredient.name}
                                                control={
                                                    <Checkbox
                                                        onChange={() => handleCheckboxChange(ingredient)}
                                                    />
                                                }
                                                label={ingredient.name}
                                            />
                                        ))}
                                    </FormGroup>
                                </div>
                            ))
                        }
                    </div>
                    <div className='pt-5'>
                        <Button
                            variant='contained'
                            disabled={!item.available}
                            type='submit'
                            onClick={() => navigate("/cart")}
                        >
                            {!item.available ? "Out Of Stock" : "Add to Cart"}
                        </Button>
                    </div>
                </form>
            </AccordionDetails>
        </Accordion>
    );
};