import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Main from './screens/Main';
import PoliticianDetails from './screens/PoliticianDetails';
import {createStackNavigator, createAppContainer} from 'react-navigation';


const MainNavigator = createStackNavigator({
  Main: {screen: Main},
  PoliticianDetails: {screen: PoliticianDetails},
},
{initialRouteName: "Main"});

const App = createAppContainer(MainNavigator);

export default App;
