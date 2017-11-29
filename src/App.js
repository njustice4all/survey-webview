import React, { Component } from 'react';
import {
  BackHandler,
  Alert,
  Platform,
  WebView,
  View,
  StatusBar,
  // PermissionsAndroid,
  Linking,
} from 'react-native';
// import WebViewAndroid from 'react-native-webview-android';
// import WebViewBridge from 'react-native-webview-bridge';
import { AppInstalledChecker } from 'react-native-check-app-install';

const ANDROID_STORE = 'market://details?id=com.nice.appcard';
const IOS_STORE = 'https://itunes.apple.com/kr/app/apple-store/id1146369440?mt=8';

export default class App extends Component {
  state = {
    backPressTime: 0,
    url: 'http://192.168.10.53:3000',
    currentOS: Platform.OS,
  };

  componentDidMount = async () => {
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          console.log(`Initial url is: ${url}`);
          this.setState({ url: 'http://192.168.10.53:3000/result' });
        }
      })
      .catch(err => console.error('An error occurred', err));

    if (this.state.currentOS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    }

    // Linking.addEventListener('url', this._handleOpenURL);
  };

  componentWillUnmount = () => {
    // Linking.removeEventListener('url', this._handleOpenURL);
    if (this.state.currentOS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
    }
  };

  _handleOpenURL = event => {
    console.log(event.url);
  };

  backHandler = () => {
    const now = new Date();
    // double press on android back button
    if (now.getTime() - this.state.backPressTime < 350) {
      Alert.alert(
        '단골프리미엄',
        '종료하시겠습니까?',
        [{ text: '취소' }, { text: '종료', onPress: () => BackHandler.exitApp() }],
        { cancelable: false },
      );

      return true;
    }

    this.setState({ backPressTime: now.getTime() });

    this.webview.goBack();
    return true;
  };

  onMessage = () => {
    // console.log('msg from web ->', event.nativeEvent.data);
    const { currentOS } = this.state;
    let url = null;
    if (currentOS === 'android') {
      url = ANDROID_STORE;
    } else {
      url = IOS_STORE;
    }

    AppInstalledChecker.checkURLScheme('niceappcard').then(isInstalled => {
      if (isInstalled) {
        Linking.openURL('niceappcard://payment');
      } else {
        Linking.openURL(url);
      }
    });
  };

  render() {
    const { url } = this.state;
    // const url = 'http://van.aty.kr';

    // if (Platform.OS === 'ios') {
    //   return (
    //     <View style={{ flex: 1 }}>
    //       <StatusBar barStyle="light-content" hidden />
    //       <WebView
    //         ref={webview => (this.webview = webview)}
    //         source={{ uri: url }}
    //         startInLoadingState
    //         scalesPageToFit
    //         javaScriptEnabled
    //         bounces={false}
    //         style={{ flex: 1 }}
    //         onMessage={this.onMessage}
    //         onNavigationStateChange={this._onNavigationStateChange}
    //       />
    //     </View>
    //   );
    // }

    // return (
    //   <View style={{ flex: 1 }}>
    //     <StatusBar barStyle="light-content" hidden />
    //     <WebViewAndroid
    //       ref={webview => (this.webview = webview)}
    //       javaScriptEnabled
    //       onMessage={this.onMessage}
    //       source={{ uri: url }}
    //       style={{ flex: 1 }}
    //     />
    //   </View>
    // );
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" hidden />
        <WebView
          ref={webview => (this.webview = webview)}
          source={{ uri: url }}
          startInLoadingState
          scalesPageToFit
          javaScriptEnabled
          bounces={false}
          style={{ flex: 1 }}
          onMessage={this.onMessage}
          // onNavigationStateChange={this._onNavigationStateChange}
        />
      </View>
    );
  }
}
