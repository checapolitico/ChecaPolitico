import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class LabeledInformation extends Component {

  render() {
    const {label, information} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}: </Text>
        <Text style={styles.information}>{information}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15,
  },
  information: {
    color: '#000',
    fontSize: 20,
    marginLeft: 20
  }
});
