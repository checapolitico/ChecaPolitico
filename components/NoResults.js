import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

export default class NoResults extends Component {

  render() {
    return (
      <View>
        <Text>Não foram encontrado resultados</Text>
      </View>
    );
  }
}
