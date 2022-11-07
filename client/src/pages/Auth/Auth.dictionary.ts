import { SignInFields, SignUpFields } from './Auth.types';

export const SIGN_IN_TITLE = 'Sign In';
export const SIGN_UP_TITLE = 'Sign Up';

export const SIGN_IN_FORM_FIELDS: SignInFields = {
  EMAIL: {
    id: 3,
    name: 'email',
    type: 'text',
    placeholder: 'Enter email',
    label: 'Email',
  },

  PASSWORD: {
    id: 4,
    name: 'password',
    type: 'password',
    placeholder: 'Enter password',
    label: 'Password',
  },
};

export const SIGN_UP_FORM_FIELDS: SignUpFields = {
  FIRST_NAME: {
    id: 1,
    name: 'firstName',
    type: 'text',
    placeholder: 'Enter your first name',
    label: 'First name',
  },

  LAST_NAME: {
    id: 2,
    name: 'lastName',
    type: 'text',
    placeholder: 'Enter your last name',
    label: 'Last name',
  },

  ...SIGN_IN_FORM_FIELDS,

  CONFIRM_PASSWORD: {
    id: 5,
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm password',
    label: 'Confirm password',
  },
};

export const SIGN_UP_MESSAGES = {
  ERROR_TITLE: 'Authorization Error',
  HAVE_ACCOUNT: 'Already have an account?',
  HAVE_ACCOUNT_LINK_TITLE: 'Sign In',
};

export const SIGN_IN_MESSAGES = {
  ERROR_TITLE: 'Authorization Error',
  HAVE_ACCOUNT: 'Don\'t have an account?',
  HAVE_ACCOUNT_LINK_TITLE: 'Sign Up',
  RESTORE_PASSWORD: 'Can\'t Sign In?',
  RESTORE_PASSWORD_LINK_TITLE: 'Restore Password',
};
