import { ColumnsType } from 'antd/es/table/Table';
import { DataType } from './OneClass.types';

export const ONE_CLASS = {
  CLASS_TITLE: 'Class',
  TABS: {
    LABEL1: 'Class students',
    LABEL2: 'Add students',
  },
  SUCCESS: {
    ADDED: 'Students added successfully to the class',
    MOVED: 'Students moved successfully to the class',
    DELETED: 'Students deleted successfully from the class',
  },
  BUTTONS: {
    ADD: 'Add to class',
    MOVE: 'Move to class',
    DELETE: 'Delete from class',
  },
  TOTAL: 'Total students',
};

export const columns: ColumnsType<DataType> = [
  {
    title: 'First name',
    dataIndex: 'firstName',
    key: 'firstName',
    sorter: {
      compare: (a, b) => a.firstName.toString().localeCompare(b.firstName),
    },
    ellipsis: true,
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
    key: 'lastName',
    sorter: {
      compare: (a, b) => (a.lastName.localeCompare(b.lastName)),
    },
    ellipsis: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: {
      compare: (a, b) => (a.email.toString().localeCompare(b.email.toString())),
    },
  },
];
