export const firstNameRules = [
  { required: true, message: 'First name is required' },
  { min: 2, message: 'Must be 2 characters or more' },
  { max: 30, message: 'Must be 30 characters or less' },
];

export const lastNameRules = [
  { required: true, message: 'Last name is required' },
  { min: 2, message: 'Must be 2 characters or more' },
  { max: 30, message: 'Must be 30 characters or less' },
];

export const emailRules = [
  {
    required: true,
    pattern: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: 'Enter a valid email address',
  },
];

export const passwordRules = [
  { required: true, message: 'Password is required' },
  { min: 6, message: 'Must be 6 characters or more' },
];
