import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import HouseOfRepresentatives from '../services/HouseOfRepresentatives';

export default class PoliticianDetails extends Component {

  constructor() {
    super();
    this.state = {data: {ultimoStatus: {}}};
  }

  componentDidMount() {
    this.load();
  }

  load() {
    if (this.props.deputy) {
      HouseOfRepresentatives.getDeputy(this.props.id)
        .then(response => this.setState({data: response.dados}));
    }
  }

  render() {
    const politician = this.props;
    return (
      <View>
      <Image source={{uri: this.state.data.ultimoStatus.urlFoto}}
             style={styles.photo}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
});
