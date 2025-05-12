import { Button, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import React from 'react'
import { TextField } from '@mui/material'
import { ErrorMessage, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../State/Authentication/action'
import * as Yup from "yup";


const initialValues = {
    email: "",
    password: "",
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
});

export const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Select only the specific part of the state that we need
    const { error } = useSelector(state => state.auth);

    const getErrorMessage = (error) => {
        if (typeof error === 'string') return error;
        if (error?.message) return error.message;
        return 'An error occurred during login';
    };


    const handleSubmit = (values) => {
        dispatch(loginUser({ userData: values, navigate }))

    }
    return (
        <div>
            <Typography variant='h5' className='text-center font-semibold' >
                Login
            </Typography>

            {error && (
                <Typography color="error" className='text-center mt-4'>
                    {getErrorMessage(error)}
                </Typography>
            )}

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                    <Form>
                        <Field
                            as={TextField}
                            name="email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={touched.email && errors.email}
                            helperText={
                                <ErrorMessage name="email">
                                    {msg => <span style={{ color: 'red' }}>{msg}</span>}
                                </ErrorMessage>
                            }
                        />

                        <Field
                            as={TextField}
                            name="password"
                            label="Password"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type="password"
                            error={touched.password && errors.password}
                            helperText={
                                <ErrorMessage name="password">
                                    {msg => <span style={{ color: 'red' }}>{msg}</span>}
                                </ErrorMessage>
                            }
                        />

                        <Button fullWidth type='submit' variant='contained' sx={{ marginTop: 2, padding: "1rem" }}>
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>

            <Typography variant='body2' className='text-center font-semibold' sx={{ marginTop: 2 }}>
                Don't have an account?
                <Button size='small' onClick={() => navigate("/account/register")} sx={{ color: "pink.A400" }}>
                    Register
                </Button>
            </Typography>
        </div>
    )
}
