export type ChangePasswordInputsNames = 'password' | 'confirmPassword';

export interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface PasswordField {
  id: number;
  name: ChangePasswordInputsNames;
  type: 'password';
  placeholder: string;
  label: string;
}

export type ChangePasswordFieldsKeys = 'PASSWORD' | 'CONFIRM_PASSWORD';

export type ChangePasswordFields = Record<ChangePasswordFieldsKeys, PasswordField>;

export interface ChangePasswordFormInputs {
  password: string;
  confirmPassword: string;
}
