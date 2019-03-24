import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, FlatList, View} from 'react-native';
import Notification from '../utils/Notification';
import HouseOfRepresentatives from '../services/HouseOfRepresentatives';
import PoliticianSummary from '../components/PoliticianSummary'
import NoResults from '../components/NoResults'
import SearchInput from '../components/SearchInput'

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  _listEmptyComponent = () => {
    return (
      <View>
        <NoResults/>
      </View>
    )
  }

  search (politicianName, searchInput) {
    if(!politicianName) {
      return;
    }
    HouseOfRepresentatives.getDeputies({nome: politicianName})
      .then(response => {
          this.setState({data: response.data});
          searchInput.clear();
        })
      .catch(e => {
        Notification.show('Falha','Erro ao tentar realizar pesquisa');
      })
  }

  render() {

    return (
      <ScrollView>
        <SearchInput searchCallback={this.search.bind(this)} />
        <FlatList
              keyExtractor={item => item.id.toString()}
              data={this.state.data}
              ListEmptyComponent={this._listEmptyComponent}
              renderItem={ ({item}) =>
                <PoliticianSummary politician={item} />
              }
          />
      </ScrollView>
    );
  }
}
