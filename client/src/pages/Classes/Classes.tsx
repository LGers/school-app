import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Card, Space,
} from 'antd';
import { useEffect, useState } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import s from './Classes.module.scss';
import { PATH } from '../../constants/common.dictionary';
import { RootState, store } from '../../redux/store';
import { logout } from '../../redux/auth/auth.slice';
import {
  confirmModal, errorModal, successModal,
} from '../../components/Modal';
import { fetchDeleteClass, fetchGetAllClasses } from '../../redux/classes/classes.thunk';
import { OneClass } from '../../redux/classes/classes.types';
import { CLASSES } from './Classes.dictionary';
import { EditClassForm } from '../../components/EditClassForm';
import { resetClassesErrorMessage, resetClassesState } from '../../redux/classes/classes.slice';
import { DashboardWrapper } from '../../components/DashboardWrapper';

export function Classes() {
  const dispatch = useDispatch();

  const { classes } = useSelector((state: RootState) => state);

  const [isAddClass, setIsAddClass] = useState(false);
  const [currentClass, setCurrentClass] = useState({
    classId: 0,
  });

  const handleAddClass = () => {
    setCurrentClass({
      classId: 0,
    });
    setIsAddClass(true);
  };

  const handleDeleteClass = (id: number, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    confirmModal({
      title: CLASSES.DELETE_CLASS_TITLE,
      okText: CLASSES.DELETE_CLASS,
      cancelText: CLASSES.CANCEL,
      onOk: async () => {
        const res = await store.dispatch(fetchDeleteClass(id));

        await store.dispatch(fetchGetAllClasses());

        if (res.meta.requestStatus === 'fulfilled') {
          successModal(CLASSES.SUCCESS_DELETE_MESSAGE, async () => {
          });
        }
      },
    });
  };

  const handleEditClass = async (id: number, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const oneClass = classes.list.find((cl: OneClass) => cl.id === id);

    if (oneClass) {
      setCurrentClass({
        classId: id,
      });
    } else {
      setCurrentClass({
        classId: 0,
      });
    }

    setIsAddClass(true);
  };

  useEffect(() => {
    if (classes.error.status) {
      errorModal(classes.error.message);

      if (classes.error.status === 401) {
        setIsAddClass(false);
        dispatch(logout());
      } else {
        dispatch(resetClassesErrorMessage());
      }
    }
  }, [classes.error, dispatch]);

  useEffect(() => {
    store.dispatch(fetchGetAllClasses());

    return function cleanUp() {
      dispatch(resetClassesState());
    };
  }, [dispatch]);

  return (
    <DashboardWrapper currentPage="classes">
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClass}>
        {CLASSES.ADD_CLASS}
      </Button>
      {classes.classNumbers.map((classNumber: number) => (
        <Space key={classNumber} style={{ display: 'flex' }} size={4}>
          {classes.list
            .filter((cl: OneClass) => cl.classNumber === classNumber)
            .map((oneClass: OneClass) => (
              <Link to={`${PATH.CLASSES}/${oneClass.id}`} key={oneClass.id}>
                <Card
                  size="small"
                  hoverable
                  style={{ marginTop: 8 }}
                  title={`${classNumber} ${oneClass.classLetter}`}
                  actions={[
                    <DeleteOutlined
                      key="delete"
                      onClick={(e) => handleDeleteClass(oneClass.id, e)}
                    />,
                    <EditOutlined key="edit" onClick={(e) => handleEditClass(oneClass.id, e)} />,
                  ]}
                >
                  <p className={s.classesText}>
                    {CLASSES.TOTAL_STUDENTS}
                  </p>
                  <p className={s.classesCount}>{oneClass.students.length}</p>
                </Card>
              </Link>
            ))}
        </Space>
      ))}
      <EditClassForm
        isOpen={isAddClass}
        setIsOpen={setIsAddClass}
        classId={currentClass.classId}
      />
    </DashboardWrapper>
  );
}
