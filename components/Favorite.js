import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Favorite extends Component {

  loadIcon(favorited) {
    return favorited ? require('../resources/icons/favorited.png') :
        require('../resources/icons/not-favorited.png');
  }

  render() {
    const { target, favoriteCallback } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={() => {favoriteCallback(target)}}>
          <Image style={styles.favoriteIcon}
              source={this.loadIcon(target.favorited)} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  favoriteIcon: {
    marginBottom: 10,
    height: 40,
    width: 40,
    tintColor: '#aa0'
  }
});
