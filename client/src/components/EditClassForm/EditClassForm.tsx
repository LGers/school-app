import * as React from 'react';
import {
  Form, Input, Modal,
} from 'antd';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState, store } from '../../redux/store';
import { EDIT_CLASS, EDIT_CLASS_FIELDS } from './EditClassForm.dictionary';
import {
  EditClassFormProps, EditClassFormValues,
} from './EditClassForm.types';
import { errorModal, successModal } from '../Modal';
import {
  classLetterRules, classNumberRules,
} from '../../constants/validation';
import {
  fetchCreateClass,
  fetchGetAllClasses,
  fetchUpdateClass,
} from '../../redux/classes/classes.thunk';
import { OneClass } from '../../redux/classes/classes.types';
import { CLASSES } from '../../pages/Classes/Classes.dictionary';

const { CLASS_NUMBER, CLASS_LETTER } = EDIT_CLASS_FIELDS;

export function EditClassForm({
  isOpen, setIsOpen, classId,
}: EditClassFormProps) {
  const { classes } = useSelector((state: RootState) => state);
  const oneClass = classes.list.find((cl: OneClass) => cl.id === classId);

  const [title, setTitle] = useState('');

  const [form] = Form.useForm();

  let successMessage = '';

  useEffect(() => {
    form.setFieldsValue({
      [CLASS_NUMBER.name]: oneClass ? oneClass.classNumber.toString() : '',
      [CLASS_LETTER.name]: oneClass ? oneClass.classLetter : '',
    });
  }, [form, isOpen, oneClass]);

  useEffect(() => {
    if (classId) {
      setTitle(CLASSES.EDIT_TITLE);
    } else {
      setTitle(CLASSES.ADD_TITLE);
    }
  }, [classId]);

  const onFinishFailed = () => {
    errorModal();
  };

  const onFinish = async (values: EditClassFormValues) => {
    let requestStatus = '';
    let requestStatusCode = 200;

    if (classId) {
      const res = await store.dispatch(fetchUpdateClass({
        id: classId,
        classNumber: values.classNumber,
        classLetter: values.classLetter,
      }));

      requestStatusCode = res.payload.status;
      requestStatus = res.meta.requestStatus;
      successMessage = CLASSES.SUCCESS_UPDATE_MESSAGE;
    } else {
      const res = await store.dispatch(fetchCreateClass({
        classNumber: values.classNumber,
        classLetter: values.classLetter,
      }));

      requestStatusCode = res.payload.status;
      requestStatus = res.meta.requestStatus;
      successMessage = CLASSES.SUCCESS_ADD_MESSAGE;
    }

    if (requestStatusCode !== 401) {
      await store.dispatch(fetchGetAllClasses());
    }

    if (requestStatus === 'fulfilled') {
      successModal(successMessage || EDIT_CLASS.SUCCESSFULLY_UPDATED);
      form.resetFields();
      setIsOpen(false);
    }
  };

  const onCancel = () => {
    form.resetFields();
    setIsOpen(false);
  };

  return (
    <Modal
      forceRender
      title={title}
      open={isOpen}
      okText={EDIT_CLASS.OK_TEXT}
      okButtonProps={{ form: EDIT_CLASS.FORM_NAME, htmlType: 'submit' }}
      destroyOnClose
      confirmLoading={classes.isFetching}
      onCancel={onCancel}
    >
      <Form
        form={form}
        name={EDIT_CLASS.FORM_NAME}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name={CLASS_NUMBER.name}
          label={CLASS_NUMBER.label}
          rules={classNumberRules}
        >
          <Input placeholder={CLASS_NUMBER.placeholder} />
        </Form.Item>
        <Form.Item
          name={CLASS_LETTER.name}
          label={CLASS_LETTER.label}
          rules={classLetterRules}
        >
          <Input placeholder={CLASS_LETTER.placeholder} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
