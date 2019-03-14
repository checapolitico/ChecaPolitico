import { ToastAndroid } from 'react-native';

export default class Notification {
  static show(title, message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
}
