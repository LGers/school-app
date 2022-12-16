import * as React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { ChangePasswordFormInputs, Props } from './ChangePasswordForm.types';
import { store } from '../../redux';
import { CHANGE_PASSWORD, CHANGE_PASSWORD_FIELDS } from './ChangePasswordForm.dictionary';
import { RootState } from '../../redux/store';
import { fetchUpdatePassword } from '../../redux/users/users.thunk';
import { successModal } from '../Modal';
import { passwordRules } from '../../constants/validation';

const { PASSWORD, CONFIRM_PASSWORD } = CHANGE_PASSWORD_FIELDS;

export function ChangePasswordForm({ isOpen, setIsOpen }: Props) {
  const { auth, users } = useSelector((state: RootState) => state);
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();
    setIsOpen(false);
  };

  const onFinish = async ({ password }: ChangePasswordFormInputs) => {
    const { id } = auth.user;

    const res = await store.dispatch(fetchUpdatePassword({ id, password }));

    if (res.meta.requestStatus === 'fulfilled') {
      successModal(CHANGE_PASSWORD.SUCCESS_MESSAGE);
    }
    form.resetFields();
    setIsOpen(false);
  };

  return (
    <div>
      <Modal
        title={CHANGE_PASSWORD.TITLE}
        open={isOpen}
        okText={CHANGE_PASSWORD.OK_TEXT}
        onCancel={onCancel}
        okButtonProps={{ form: CHANGE_PASSWORD.FORM_NAME, htmlType: 'submit' }}
        destroyOnClose
        confirmLoading={users.isFetching}
      >
        <Form
          form={form}
          name={CHANGE_PASSWORD.FORM_NAME}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name={PASSWORD.name}
            label={PASSWORD.label}
            rules={passwordRules}
          >
            <Input.Password placeholder={PASSWORD.placeholder} prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            name={CONFIRM_PASSWORD.name}
            label={CONFIRM_PASSWORD.label}
            validateFirst
            rules={[
              ...passwordRules,
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue(PASSWORD.name) === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(CHANGE_PASSWORD.NOT_MATCH_PASSWORDS));
                },
              }),
            ]}
          >
            <Input.Password placeholder={CONFIRM_PASSWORD.placeholder} prefix={<LockOutlined />} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
