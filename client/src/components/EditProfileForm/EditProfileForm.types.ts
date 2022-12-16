import { User } from '../../redux/auth/auth.types';

export interface EditProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface EditProfileFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user?: User;
}
