export interface EditClassFormValues {
  classNumber: string;
  classLetter: string;
}

export interface EditClassFormProps {
  classId: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
