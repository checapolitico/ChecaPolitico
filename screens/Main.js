import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, FlatList, View} from 'react-native';
import Notification from '../utils/Notification';
import HouseOfRepresentatives from '../services/HouseOfRepresentatives';
import PoliticianSummary from '../components/PoliticianSummary';
import NoResults from '../components/NoResults';
import SearchInput from '../components/SearchInput';
import PoliticianUtils from '../utils/PoliticianUtils';

export default class Main extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    PoliticianUtils.getFavorites()
      .then(favorites => {
        if(!favorites) return;
        favorites.forEach(favorite => favorite.favorited = true);
        this.setState({data: favorites});
      });
  }

  _listEmptyComponent = () => {
    return (
      <View>
        <NoResults/>
      </View>
    )
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
                <PoliticianSummary
                  politician={item}
                  navigation={this.props.navigation}
                  favoriteCallback={this.favoritePolitician.bind(this)}/>
              }
          />
      </ScrollView>
    );
  }

  favoritePolitician (politician) {
    PoliticianUtils.favorite(politician)
      .then(favorited => {
        this.updateFavoritePolitician({id: politician.id, favorited: favorited});
      });
  }

  updateFavoritePolitician(politicianChanged) {
    let newPolitician = this.state.data.find(politician => politician.id == politicianChanged.id);
    newPolitician.favorited = politicianChanged.favorited;
    let newData = [];
    for(let item of this.state.data) {
      newData.push(item.id == newPolitician.id ? newPolitician:item);
    }
    this.setState({data: newData});
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
        Notification.show('Error','Error trying to retrieve information');
      })
  }
}
