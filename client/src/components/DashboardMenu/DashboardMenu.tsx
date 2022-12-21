import * as React from 'react';
import { Menu, MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { PATH } from '../../constants/common.dictionary';
import { DashboardMenuProps } from './DashboardMenu.types';

const items: MenuProps['items'] = [
  {
    label: (<Link to={PATH.USERS}>Users</Link>),
    key: 'users',
  },
  {
    label: (<Link to={PATH.CLASSES}>Classes</Link>),
    key: 'classes',
  },
];

export function DashboardMenu({ currentPage }: DashboardMenuProps) {
  return (
    <Menu
      selectedKeys={[currentPage]}
      mode="horizontal"
      items={items}
    />
  );
}
