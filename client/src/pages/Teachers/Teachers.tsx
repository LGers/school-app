import React, { useEffect, useState } from 'react';
import {
  Button, message, Space, Table, Tabs,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { TEACHERS } from './Teachers.dictionary';
import { store } from '../../redux';
import {
  fetchDeleteTeacher,
  fetchGetAllTeachers,
  fetchUpdateTeacher,
} from '../../redux/teachers/teachers.thunk';
import { resetTeachersErrorMessage, resetTeachersState } from '../../redux/teachers/teachers.slice';
import { columns } from '../OneClass/OneClass.dictionary';
import { Student, User } from '../../redux/oneClass/oneClass.types';
import { RootState } from '../../redux/store';
import { DashboardTitle } from '../../components/DashboardTitle';
import { DashboardWrapper } from '../../components/DashboardWrapper';
import { Roles } from '../../constants/common.dictionary';
import { errorModal } from '../../components/Modal';

const {
  TABS, BUTTON, TITLE, SUCCESS,
} = TEACHERS;

export function Teachers() {
  const dispatch = useDispatch();

  const [selectedUsers, setSelectedUsers] = useState<Array<React.Key>>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<Array<React.Key>>([]);

  const { teachers } = useSelector((state: RootState) => state);

  const [messageApi, contextHolder] = message.useMessage();

  const refreshData = async () => {
    await store.dispatch(fetchGetAllTeachers());
  };

  useEffect(() => {
    store.dispatch(fetchGetAllTeachers());

    return function cleanUp() {
      dispatch(resetTeachersState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (teachers.error.message) {
      errorModal(teachers.error.message);
      dispatch(resetTeachersErrorMessage());
    }
  }, [dispatch, teachers.error.message]);

  const userRowSelection = {
    selectedRowKeys: selectedUsers,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedUsers(newSelectedRowKeys);
    },
  };

  const dataTeachersSource = teachers.teachers.map(({
    firstName, lastName, email, ...teacher
  }: Student) => ({
    key: teacher.id,
    firstName,
    lastName,
    email,
  }));

  const dataUsersSource = teachers.users.map(({
    firstName, lastName, email, ...user
  }: User) => ({
    key: user.id,
    firstName,
    lastName,
    email,
  }));

  const teacherRowSelection = {
    selectedRowKeys: selectedTeachers,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedTeachers(newSelectedRowKeys);
    },
  };

  const successMessage = (content?: string) => {
    messageApi.open({
      type: 'success',
      content: content || 'Success',
    });
  };

  const handleAddTeachers = async () => {
    let responseStatus = '';

    await selectedUsers.reduce((acc, cur) => acc.then(async () => {
      const res = await store.dispatch(fetchUpdateTeacher({
        id: parseInt(cur.toString(), 10),
        role: Roles.TEACHER,
      }));

      responseStatus = res.meta.requestStatus;
    }), Promise.resolve());

    await refreshData();
    setSelectedUsers([]);

    if (responseStatus === 'fulfilled') {
      successMessage(SUCCESS.ADDED);
    }
  };

  const handleDeleteTeachers = async () => {
    let responseStatus = '';

    await selectedTeachers.reduce((acc, cur) => acc.then(async () => {
      const res = await store.dispatch(fetchDeleteTeacher({
        id: parseInt(cur.toString(), 10),
      }));

      responseStatus = res.meta.requestStatus;
    }), Promise.resolve());

    await refreshData();
    setSelectedTeachers([]);

    if (responseStatus === 'fulfilled') {
      successMessage(SUCCESS.DELETED);
    }
  };

  return (
    <DashboardWrapper currentPage="teachers">
      {contextHolder}
      <DashboardTitle title={TITLE} />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: TABS.LABEL1,
            key: '1',
            children: (
              <div>
                <Space style={{ marginBottom: 12 }}>
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={handleDeleteTeachers}
                    disabled={!selectedTeachers.length}
                    danger
                    loading={teachers.isFetching}
                  >
                    {BUTTON.DELETE}
                  </Button>
                </Space>
                <Table
                  rowSelection={teacherRowSelection}
                  dataSource={dataTeachersSource}
                  columns={columns}
                  pagination={{
                    defaultPageSize: 20,
                    position: ['bottomLeft'],
                  }}
                />
              </div>),
          },
          {
            label: TABS.LABEL2,
            key: '2',
            children: (
              <div>
                <Space style={{ marginBottom: 12 }}>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAddTeachers}
                    disabled={!selectedUsers.length}
                    loading={teachers.isFetching}
                  >
                    {BUTTON.ADD}
                  </Button>
                </Space>
                <Table
                  rowSelection={userRowSelection}
                  dataSource={dataUsersSource}
                  columns={columns}
                  pagination={{
                    defaultPageSize: 20,
                    position: ['bottomLeft'],
                  }}
                />
              </div>),
          },
        ]}
      />
    </DashboardWrapper>
  );
}
