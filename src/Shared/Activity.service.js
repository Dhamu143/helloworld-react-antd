import { message as UIMessage, notification as UINotification, Modal } from 'antd';
import { getStore } from '../store';
import * as Logger from '../common/logger';

import { $processing, $done } from './Activity.state';

/**
 * Processing
 */

export function processing(module = 'App', operation = 'default') {
  getStore().dispatch($processing(`${module}.${operation}`));
}

export function done(module = 'App', operation = 'default') {
  getStore().dispatch($done(`${module}.${operation}`));
}

/**
 * Notification and Alerts
 */

const NOTIFICATION_TYPE = {
  success: 'success',
  failure: 'error',
  warning: 'warning',
  info: 'info',
};

export function toast(type, title, content = '', icon = null, duration, placement = 'topRight') {
  type = NOTIFICATION_TYPE[type] || NOTIFICATION_TYPE.default;

  Logger.debug('toast', type, title);
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
  type = NOTIFICATION_TYPE[type] || NOTIFICATION_TYPE.default;

  Logger.debug('$status', type, label);

  if (statusReference) {
    statusReference();
    statusReference = null;
  }

  statusReference = UIMessage[type](label);
}

export function alert(type, title, content) {}

const CONFIRM_TYPE = {
  default: 'primary',
  critical: 'danger',
};

let alertReference = null;

export function confirm(title, content, options = {}) {
  options.actionType = CONFIRM_TYPE[options.actionType] || CONFIRM_TYPE.default;
  options.actionLabel = options.actionLabel || 'Confirm';

  Logger.debug('$confim', title, content, options);

  if (alertReference) {
    alertReference.destroy();
  }

  return new Promise((resolve, reject) => {
    alertReference = Modal.confirm({
      title,
      content,
      okType: options.actionType,
      okText: options.actionLabel,
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
