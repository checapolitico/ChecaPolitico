import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Main from './screens/Main'


export default class App extends Component<Props> {

  render() {
    return (
      <View>
        <Main/>
      </View>
    );
  }
}
