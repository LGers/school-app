import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, message, Select, Space, Table, Tabs,
} from 'antd';
import { ArrowRightOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { DashboardWrapper } from '../../components/DashboardWrapper';
import { DashboardTitle } from '../../components/DashboardTitle';
import {
  fetchGetAllClasses,
  fetchGetAllUsers,
  fetchGetOneClass, fetchUpdateStudent,
} from '../../redux/oneClass/oneClass.thunk';
import { store } from '../../redux';
import { resetOneClassErrorMessage, resetOneClassState } from '../../redux/oneClass/oneClass.slice';
import { errorModal } from '../../components/Modal';
import { PATH } from '../../constants/common.dictionary';
import { RootState } from '../../redux/store';
import { ClassesList, Student, User } from '../../redux/oneClass/oneClass.types';
import { columns, ONE_CLASS } from './OneClass.dictionary';

const {
  CLASS_TITLE, TABS, SUCCESS, BUTTONS, TOTAL,
} = ONE_CLASS;

export function OneClass() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedUsers, setSelectedUsers] = useState<Array<React.Key>>([]);
  const [selectedStudents, setSelectedStudents] = useState<Array<React.Key>>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');

  const { oneClass } = useSelector((state: RootState) => state);

  const classTitle = `${oneClass.oneClass.classNumber ?? ''} ${oneClass.oneClass.classLetter ?? ''}`;

  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = (content?: string) => {
    messageApi.open({
      type: 'success',
      content: content || 'Success',
    });
  };

  const refreshData = async () => {
    if (id) {
      await store.dispatch(fetchGetOneClass({ id: parseInt(id, 10) }))
        .then(() => store.dispatch((fetchGetAllUsers())))
        .then(() => store.dispatch(fetchGetAllClasses()));
    }
  };

  const userRowSelection = {
    selectedRowKeys: selectedUsers,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedUsers(newSelectedRowKeys);
    },
  };

  const studentRowSelection = {
    selectedRowKeys: selectedStudents,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedStudents(newSelectedRowKeys);
    },
  };

  const handleClassSelect = (value: string) => {
    setSelectedClassId(value);
  };

  const dataStudentsSource = oneClass.oneClass.students.map(({
    firstName, lastName, email, ...student
  }: Student) => ({
    key: student.id,
    firstName,
    lastName,
    email,
  }));

  const dataUsersSource = oneClass.users.map(({
    firstName, lastName, email, ...user
  }: User) => ({
    key: user.id,
    firstName,
    lastName,
    email,
  }));

  useEffect(() => {
    if (id && parseInt(id, 10).toString() === id) {
      refreshData();
    } else {
      navigate(PATH.CLASSES);
    }

    return function cleanUp() {
      dispatch(resetOneClassState());
    };
    // eslint-disable-next-line
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (oneClass.error.message) {
      errorModal(oneClass.error.message);
      dispatch(resetOneClassErrorMessage());
    }
  }, [dispatch, oneClass.error.message]);

  const handleAddStudents = async () => {
    let responseStatus = '';

    await selectedUsers.reduce((acc, cur) => acc.then(async () => {
      if (id) {
        const res = await store.dispatch(fetchUpdateStudent({
          id: parseInt(cur.toString(), 10),
          role: 'STUDENT',
          classId: id,
        }));

        responseStatus = res.meta.requestStatus;
      }
    }), Promise.resolve());

    await refreshData();
    setSelectedUsers([]);

    if (responseStatus === 'fulfilled') {
      successMessage(`${SUCCESS.ADDED} ${classTitle}`);
    }
  };

  const handleMoveStudents = async () => {
    let responseStatus = '';

    await selectedStudents.reduce((acc, cur) => acc.then(async () => {
      const res = await store.dispatch(fetchUpdateStudent({
        id: parseInt(cur.toString(), 10),
        role: 'STUDENT',
        classId: selectedClassId,
      }));

      responseStatus = res.meta.requestStatus;
    }), Promise.resolve());

    await refreshData();
    setSelectedStudents([]);

    if (responseStatus === 'fulfilled') {
      successMessage(`${SUCCESS.MOVED} ${oneClass.classesList.find((cl: ClassesList) => cl.id === +selectedClassId).name}`);
    }
  };

  const handleDeleteStudents = async () => {
    let responseStatus = '';

    await selectedStudents.reduce((acc, cur) => acc.then(async () => {
      const res = await store.dispatch(fetchUpdateStudent({
        id: parseInt(cur.toString(), 10),
        role: 'USER',
        classId: null,
      }));

      responseStatus = res.meta.requestStatus;
    }), Promise.resolve());

    await refreshData();
    setSelectedStudents([]);

    if (responseStatus === 'fulfilled') {
      successMessage(`${SUCCESS.DELETED} ${classTitle}`);
    }
  };

  return (
    <DashboardWrapper currentPage="classes">
      {contextHolder}
      <DashboardTitle title={`${CLASS_TITLE} ${classTitle}`} />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: TABS.LABEL1,
            key: '1',
            children: (
              <div>
                <div>
                  <Space>
                    <p>{TOTAL}</p>
                    <p>{oneClass.oneClass.students.length}</p>
                  </Space>
                </div>
                <Space style={{ marginBottom: 12 }}>
                  <Button
                    type="primary"
                    onClick={handleMoveStudents}
                    disabled={!selectedClassId || !selectedStudents.length}
                  >
                    {BUTTONS.MOVE}
                    <ArrowRightOutlined />
                  </Button>
                  <Select
                    style={{ width: 120 }}
                    onChange={handleClassSelect}
                    options={oneClass.classesList.map((cl: ClassesList) => (
                      {
                        value: cl.id,
                        label: cl.name,
                        disabled: cl.name === classTitle.replace(/\s/g, ''),
                      }
                    ))}
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    type="primary"
                    danger
                    onClick={handleDeleteStudents}
                    disabled={!selectedStudents.length}
                  >
                    {`${BUTTONS.DELETE} ${classTitle}`}
                  </Button>
                </Space>
                <Table
                  rowSelection={studentRowSelection}
                  dataSource={dataStudentsSource}
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
                <div>
                  <Space>
                    <p>Total users</p>
                    <p>{oneClass.users.length}</p>
                  </Space>
                </div>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddStudents}
                  disabled={!selectedUsers.length}
                >
                  {`${BUTTONS.ADD} ${classTitle}`}
                </Button>
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
