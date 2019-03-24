import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';

export default class SearchInput extends Component {

  constructor() {
    super();
    this.state = {
      politicianName: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
            placeholder="Digite o nome de um deputado..."
            ref={input => this.searchInput = input}
            onChangeText={texto => this.setState({politicianName: texto})}/>

        <TouchableOpacity onPress={() => {
          this.props.searchCallback(this.state.politicianName, this.searchInput);
          this.setState({politicianName: ''})
        }}>
          <Image style={styles.icon}
              source={require('../resources/images/search.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  input: {
    flex: 1,
    height: 40,
  },
  icon: {
    width: 30,
    height: 30
  }
})
