import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import HouseOfRepresentatives from '../services/HouseOfRepresentatives';
import LabeledInformation from '../components/LabeledInformation';

const screenWidth = Math.round(Dimensions.get('window').width);

export default class PoliticianDetails extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {data: {lastStatus: {cabinet: {}}}};
  }

  componentDidMount() {
    this.load();
  }

  load() {
    const { navigation } = this.props;
    const isDeputy = navigation.getParam('isDeputy', true);
    const id = navigation.getParam('id', 0);
    if(id != 0) {
      if (isDeputy) {
        HouseOfRepresentatives.getDeputy(id)
          .then(response => {
            if(response.data.lastStatus.photo) {
              response.data.lastStatus.photo += 'maior.jpg'; //Get photo with better quality
            }
            this.setState({data: response.data});
          });
      }
    }
  }

  render() {
    return (
      <ScrollView>
        <Image source={{uri: this.state.data.lastStatus.photo}}
               style={styles.photo}/>
        <Text style={styles.header}>{this.state.data.lastStatus.name}</Text>
        <LabeledInformation label='E-mail' information={this.state.data.lastStatus.cabinet.email} />
        <LabeledInformation label='Telefone' information={this.state.data.lastStatus.cabinet.phone} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  photo: {
    width: screenWidth,
    height: screenWidth,
  },
  header: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 25,
    textAlign: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
});
