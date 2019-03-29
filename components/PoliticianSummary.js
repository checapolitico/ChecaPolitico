import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import InformationField from './InformationField';
import Favorite from './Favorite';

export default class PoliticianSummary extends Component {

  getParty(politician) {
    return `${politician.party} (${politician.state})`;
  }

  render() {
    const politician = JSON.parse(JSON.stringify(this.props.politician)); //Change to the correct way
    const favoriteCallback = this.props.favoriteCallback;
    return (
      <View>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('PoliticianDetails', {id: politician.id});
        }}>
          <View style={styles.container}>
            <Image source={{uri: politician.photo}}
                   style={styles.photo}/>
            <View style={styles.infoContainer}>
              <InformationField field="Nome" information={politician.name} />
              <InformationField field="Partido" information={this.getParty(politician)} />
            </View>
            <Favorite target={politician} favoriteCallback={favoriteCallback} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 5
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  infoContainer: {
    alignItems: 'flex-start',
    flex: 1,
  },
});
