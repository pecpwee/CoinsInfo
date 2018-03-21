/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation'
import HomeScreen from './HomeScreen'
import DetailScreen from './DetailScreen'
import FavorateScreen from './FavorateScreen'

const HomeStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: { tabBarVisible: false }

    }
  },
  {
    initialRouteName: 'Home'
  }
)
const FavorateStack = StackNavigator(
  {
    Favorate: {
      screen: FavorateScreen
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: { tabBarVisible: false }
    }
  },
  {
    initialRouteName: 'Favorate'
  }
)

const TabScreen = TabNavigator(
  {
    Home: { screen: HomeStack },
    Favorate: { screen: FavorateStack },
  },
  {
    /* Other configuration remains unchanged */
    tabBarPosition: 'bottom',
    swipeEnabled: false,

  }
);


export default class App extends Component {
  render() {
    return (
      <TabScreen />
    );
  }
}

