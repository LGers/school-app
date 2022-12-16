import { ChangePasswordFields } from './ChangePasswordForm.types';

export const CHANGE_PASSWORD_FIELDS: ChangePasswordFields = {
  PASSWORD: {
    id: 4,
    name: 'password',
    type: 'password',
    placeholder: 'Enter password',
    label: 'Password',
  },
  CONFIRM_PASSWORD: {
    id: 5,
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm password',
    label: 'Confirm password',
  },
};

export const CHANGE_PASSWORD = {
  TITLE: 'Change password',
  FORM_NAME: 'changePasswordForm',
  SUCCESS_MESSAGE: 'Password successfully updated.',
  NOT_MATCH_PASSWORDS: 'The two passwords that you entered do not match!',
  OK_TEXT: 'Save',
  CANCEL_TEXT: 'Cancel',
};
