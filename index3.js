/** @format */

import {AppRegistry} from 'react-native';
import React, {Component} from 'react';
import {TouchableOpacity, Platform, StyleSheet, Text, View} from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {App3_1,App3_2} from "./App3";
const App3 = createStackNavigator({
  App3_1: {screen: App3_1},
  App3_2: {screen: App3_2}
});

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const xx = gestureHandlerRootHOC(createAppContainer(App3));

AppRegistry.registerComponent("reactnative_multibundler3", () => xx);
