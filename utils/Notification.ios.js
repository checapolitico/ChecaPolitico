import { AlertIOS } from 'react-native';

export default class Notification {
  static show(titulo, message) {
    AlertIOS.alert(titulo, message);
  }
}
