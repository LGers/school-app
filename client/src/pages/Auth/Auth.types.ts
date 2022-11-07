export type SignInInputNames = 'email' | 'password';
export type SingUpInputNames = SignInInputNames | 'firstName' | 'lastName' | 'confirmPassword';

export interface SignInField {
  id: number;
  name: SignInInputNames;
  type: 'text' | 'password';
  placeholder: string;
  label: string;
}

export interface SignUpField {
  id: number;
  name: SingUpInputNames;
  type: 'text' | 'password';
  placeholder: string;
  label: string;
}

export type SignUpFieldsKeys = 'FIRST_NAME' | 'LAST_NAME' | 'EMAIL' | 'PASSWORD' | 'CONFIRM_PASSWORD';
export type SignInFieldsKeys = 'EMAIL' | 'PASSWORD';

export type SignInFields = Record<SignInFieldsKeys, SignInField>;
export type SignUpFields = Record<SignUpFieldsKeys, SignUpField>;

export interface SignInFormInputs {
  email: string;
  password: string;
}

export interface SignUpFormInputs extends SignInFormInputs {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}
