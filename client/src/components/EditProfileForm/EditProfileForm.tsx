import * as React from 'react';
import { Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../redux/store';
import { EDIT_PROFILE, EDIT_PROFILE_FIELDS } from './EditProfileForm.dictionary';
import { fetchUpdateUser } from '../../redux/users/users.thunk';
import { EditProfileFormProps, EditProfileFormValues } from './EditProfileForm.types';
import { updateUser } from '../../redux/auth/auth.slice';
import { successModal } from '../Modal';
import { emailRules, firstNameRules, lastNameRules } from '../../constants/validation';

const { FIRST_NAME, LAST_NAME, EMAIL } = EDIT_PROFILE_FIELDS;

export function EditProfileForm({ isOpen, setIsOpen }: EditProfileFormProps) {
  const { auth, users } = useSelector((state: RootState) => state);

  const initialValues = {
    [FIRST_NAME.name]: auth.user.firstName,
    [LAST_NAME.name]: auth.user.lastName,
    [EMAIL.name]: auth.user.email,
  };

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values: EditProfileFormValues) => {
    const { id } = auth.user;
    const res = await store.dispatch(fetchUpdateUser({ id, ...values }));

    if (res.meta.requestStatus === 'fulfilled') {
      successModal(EDIT_PROFILE.SUCCESSFULLY_UPDATED);
    }

    dispatch(updateUser(res.payload));
    form.resetFields();
    setIsOpen(false);
  };

  const onCancel = () => {
    form.resetFields();
    setIsOpen(false);
  };

  return (
    <Modal
      title={EDIT_PROFILE.TITLE}
      open={isOpen}
      okText={EDIT_PROFILE.OK_TEXT}
      okButtonProps={{ form: EDIT_PROFILE.FORM_NAME, htmlType: 'submit' }}
      destroyOnClose
      confirmLoading={auth.isFetching || users.isFetching}
      onCancel={onCancel}
    >
      <Form
        form={form}
        name={EDIT_PROFILE.FORM_NAME}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={initialValues}
      >
        <Form.Item
          name={FIRST_NAME.name}
          label={FIRST_NAME.label}
          rules={firstNameRules}
        >
          <Input placeholder={FIRST_NAME.placeholder} />
        </Form.Item>
        <Form.Item
          name={LAST_NAME.name}
          label={LAST_NAME.label}
          rules={lastNameRules}
        >
          <Input placeholder={LAST_NAME.placeholder} />
        </Form.Item>
        <Form.Item
          name={EMAIL.name}
          label={EMAIL.label}
          rules={emailRules}
          validateFirst
        >
          <Input placeholder={EMAIL.placeholder} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
