import React, { Component } from 'react';
import { Platform, WebView, View, Text, StatusBar, BackHandler, Alert } from 'react-native';
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
      Alert.alert(
        '단골프리미엄',
        '종료하시겠습니까?',
        [
          { text: '취소', onPress: () => console.log('Cancel Pressed') },
          { text: '종료', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );

      return true;
    }

    this.setState(prevState => ({ backPressTime: now.getTime() }));

    this.webview.goBack();
    return true;
  };

  _onMessage = event => {
    console.log('msg from web ->', event.nativeEvent.data);
  };

  render() {
    const url = 'http://192.168.10.53:3000';
    // const url = 'http://van.aty.kr';

    if (Platform.OS !== 'ios') {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#fe931f" barStyle="light-content" hidden />
          <WebView
            ref={webview => (this.webview = webview)}
            source={{ uri: url }}
            startInLoadingState
            scalesPageToFit
            javaScriptEnabled
            bounces={false}
            style={{ flex: 1 }}
            onMessage={this._onMessage}
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
          onMessage={this._onMessage}
          source={{ uri: url }}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}
