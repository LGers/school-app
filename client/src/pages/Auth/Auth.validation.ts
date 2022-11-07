import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  firstName: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .required('First name is required')
    .min(2, 'Must be 2 characters or more'),
  lastName: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .required('Last name is required')
    .min(2, 'Must be 2 characters or more'),
  password: Yup.string().required('Password is required').min(6, 'Must be 6 characters or more'),
  confirmPassword: Yup.string()
    .required('Password is required')
    .min(6, 'Must be 6 characters or more')
    .max(50, 'Must be 50 characters or less')
    .oneOf([Yup.ref('password'), null], 'Confirm password must match password'),
});

export const signInValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Must be 6 characters or more')
    .max(50, 'Must be 50 characters or less'),
});
