import { Modal } from 'antd';
import { MODAL_BASIC } from './Modal.dictionary';

const { TEXTS } = MODAL_BASIC;

export const successModal = (message?: string, onOk?: () => void) => {
  Modal.success({
    content: message || TEXTS.TITLE_SUCCESS,
    onOk() {
      if (onOk) {
        onOk();
      }
    },
  });
};

export const errorModal = (message?: string, onOk?: () => void) => {
  Modal.error({
    title: TEXTS.TITLE_ISSUE,
    content: message || TEXTS.UNKNOWN_ISSUE,
    onOk() {
      if (onOk) {
        onOk();
      }
    },
  });
};

export interface ConfirmModalInterface {
  title?: string;
  okText?: string,
  cancelText?: string,
  onOk?: () => void;
}

export const confirmModal = ({
  title, okText, cancelText, onOk,
}: ConfirmModalInterface) => {
  Modal.confirm({
    title: title || TEXTS.SURE,
    okText: okText || TEXTS.YES,
    okType: 'danger',
    cancelText: cancelText || TEXTS.NO,
    keyboard: true,
    closable: true,
    maskClosable: true,
    onOk() {
      if (onOk) {
        onOk();
      }
    },
  });
};
