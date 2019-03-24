import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';

export default class InformationField extends Component {

  render() {
    const {field, information} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.field}>{field}: </Text>
        <Text style={styles.information}>{information}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  field: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 20,
    flexWrap:'wrap'
  },
  information: {
    color: '#000',
    fontSize: 20,
    flexWrap: 'wrap',
    flex: 1
  }
});
