import React from 'react'
import { Button, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { TextField } from '@mui/material'
import { ErrorMessage, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../State/Authentication/action'
import * as Yup from "yup";

const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER"
}


const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required("Full name is required")
        .min(3, "Full name must be at least 3 characters")
        .max(50, "Full name must not exceed 50 characters"),
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
    role: Yup.string()
        .required("Role is required")
        .oneOf(["ROLE_CUSTOMER", "ROLE_RESTAURANT_OWNER"], "Invalid role selected")
});


export const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Select only the specific part of the state that we need
    const { error } = useSelector(state => state.auth);

    const getErrorMessage = (error) => {
        if (typeof error === 'string') return error;
        if (error?.message) return error.message;
        return 'An error occurred during registration';
    };

    const handleSubmit = (values) => {
        dispatch(registerUser({ userData: values, navigate }))

    }
    return (
        <div>
            <Typography variant='h5' className='text-center font-semibold' >
                Register
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
                            name="fullName"
                            label="Full Name"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={touched.fullName && errors.fullName}
                            helperText={
                                <ErrorMessage name="fullName">
                                    {msg => <span style={{ color: 'red' }}>{msg}</span>}
                                </ErrorMessage>
                            }
                        />

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

                        <FormControl fullWidth
                            margin="normal">
                            <InputLabel id="role-label">Role</InputLabel>
                            <Field
                                as={Select}
                                name="role"
                                labelId="role-label"
                                id="role-select"
                                label="Role"
                            >
                                <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                                <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
                            </Field>
                        </FormControl>

                        <Button fullWidth type='submit' variant='contained' sx={{ marginTop: 2, padding: "1rem" }}>
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>

            <Typography variant='body2' className='text-center font-semibold' sx={{ marginTop: 2 }}>
                Already have an account?
                <Button size='small' onClick={() => navigate("/account/login")} sx={{ color: "pink.A400" }}>
                    Login
                </Button>
            </Typography>
        </div>
    )
}
