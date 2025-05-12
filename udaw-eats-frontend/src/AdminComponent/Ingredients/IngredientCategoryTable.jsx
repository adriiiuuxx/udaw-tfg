import { Box, Card, CardHeader, IconButton, Snackbar, Alert } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import { CreateIngredientCategoryForm } from './CreateIngredientCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientCategories } from '../../State/Ingredients/action';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export const IngredientCategoryTable = () => {
    const [open, setOpen] = React.useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const handleSuccess = (message) => {
        setSnackbar({
            open: true,
            message,
            severity: 'success'
        });
        handleClose();
    };

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    // Select only the specific parts of the state that we need
    const restaurant = useSelector(state => state.restaurant);
    const ingredients = useSelector(state => state.ingredients);

    useEffect(() => {
        dispatch(getIngredientCategories({id:restaurant.usersRestaurant.id, jwt}))
    }, [dispatch, restaurant.usersRestaurant.id, jwt]);
    return (
        <Box>
            <Card className='mt-2'>
                <CardHeader title={"Ingredient Category"} sx={{ pt: 2, alignItems: "center" }} action={
                    <IconButton onClick={handleOpen} aria-label='settings'>
                        <CreateIcon />
                    </IconButton>
                } />

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="left">Name</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredients.category.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.id}
                                    </TableCell>
                                    <TableCell align="left">{item.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateIngredientCategoryForm onSuccess={handleSuccess} />
                </Box>
            </Modal>

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
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
