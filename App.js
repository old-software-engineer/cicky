import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SplashScreen from "react-native-splash-screen";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { RootNavigator } from "./routes";
import { App as Style } from "./static/styles/base";
import Reducer from './reducers/Reducer';

const Store = createStore(Reducer);

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
      <Provider store={Store}>
        <View style={Style.body}>
          <RootNavigator />
        </View>
      </Provider>
    );
  }
}
