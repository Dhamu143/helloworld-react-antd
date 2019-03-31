import { message as UIMessage, notification as UINotification, Modal } from 'antd';

export const SUCCESS = 'success';
export const FAILURE = 'failure';
export const WARNING = 'warning';
export const INFO = 'info';

export const TEXT_OK = 'OK';
export const TEXT_CANCEL = 'Cancel';
export const TEXT_RETURN = 'Return';

const DIALOG_TYPE = {
  success: 'success',
  failure: 'error',
  warning: 'warning',
  info: 'info',
};

export function toast(type, title, content = '', icon = null, duration, placement = 'topRight') {
  type = DIALOG_TYPE[type] || DIALOG_TYPE.default;

  UINotification[type]({
    message: title,
    description: content,
    icon,
    duration,
    placement,
  });
}

let statusReference = null;

export function status(type, label) {
  type = DIALOG_TYPE[type] || DIALOG_TYPE.default;

  if (statusReference) {
    statusReference();
    statusReference = null;
  }

  statusReference = UIMessage[type](label);
}

export function alert(title, content, _options = {}) {
  // @TODO
}

const CONFIRM_TYPE = {
  default: 'primary',
  critical: 'danger',
};

let alertReference = null;

export function confirm(title, content, _options = {}) {
  _options.actionType = CONFIRM_TYPE[_options.actionType] || CONFIRM_TYPE.default;
  _options.actionLabel = _options.actionLabel || 'Confirm';

  if (alertReference) {
    alertReference.destroy();
  }

  return new Promise((resolve, reject) => {
    alertReference = Modal.confirm({
      title,
      content,
      okType: _options.actionType,
      okText: _options.actionLabel,
      onOk() {
        alertReference = null;
        resolve(true);
      },
      onCancel() {
        alertReference = null;
        resolve(false);
      },
    });
  });
}

export function confirmWithNeutral(title, content, _options = {}) {
  // @TODO
}
