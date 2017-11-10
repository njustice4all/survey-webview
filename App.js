import React, { Component } from 'react';
import { Platform, WebView, View, StatusBar, BackHandler } from 'react-native';
import WebViewAndroid from 'react-native-webview-android';

export default class App extends Component {
  state = { backPressTime: 0 };

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.backHandler);
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
  };

  backHandler = () => {
    const now = new Date();
    // double press on android back button
    if (now.getTime() - this.state.backPressTime < 250) {
      return false;
    }

    this.setState(prevState => ({ backPressTime: now.getTime() }));

    if (true) {
      this.webview.goBack();
      return true;
    }
  };

  render() {
    const url = 'http://192.168.10.53:3000';
    // const url = 'http://van.aty.kr';

    if (Platform.OS === 'ios') {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#fe931f" barStyle="light-content" hidden />
          <WebView
            source={{ uri: url }}
            startInLoadingState
            scalesPageToFit
            javaScriptEnabled
            bounces={false}
            style={{ flex: 1 }}
          />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <WebViewAndroid
          ref={webview => (this.webview = webview)}
          javaScriptEnabled
          url={url}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}
