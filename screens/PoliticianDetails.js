import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
} from 'react-native';
import HouseOfRepresentatives from '../services/HouseOfRepresentatives';
import LabeledInformation from '../components/LabeledInformation';
import Favorite from '../components/Favorite';
import PoliticianUtils from '../utils/PoliticianUtils';

const screenWidth = Math.round(Dimensions.get('window').width);

export default class PoliticianDetails extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {data: {lastStatus: {cabinet: {}}, favorited: false}};
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
            PoliticianUtils.isFavorited(response.data.id)
            .then(favorited => {
              this.updateFavoritePolitician(favorited);
            });
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
        <View style={styles.header}>
          <Text style={styles.headerText}>{this.state.data.lastStatus.name}</Text>
          <Favorite target={this.state.data} favoriteCallback={this.favoritePolitician.bind(this)} />
        </View>
        <LabeledInformation label='E-mail' information={this.state.data.lastStatus.cabinet.email} />
        <LabeledInformation label='Telefone' information={this.state.data.lastStatus.cabinet.phone} />
      </ScrollView>
    );
  }

  favoritePolitician (politician) {
    PoliticianUtils.favorite(politician)
      .then(favorited => {
        this.updateFavoritePolitician(favorited);
      });
  }

  updateFavoritePolitician(favorited) {
    let newData = this.state.data;
    newData.favorited = favorited;
    this.setState({data: newData});
  }
}

const styles = StyleSheet.create({
  photo: {
    width: screenWidth,
    height: screenWidth,
  },
  header: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  headerText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 25,
    textAlign: 'center',
  }
});
