import React, { Component } from 'react';
import {
  BackHandler,
  Alert,
  Platform,
  WebView,
  View,
  StatusBar,
  // PermissionsAndroid,
} from 'react-native';
import WebViewAndroid from 'react-native-webview-android';

export default class App extends Component {
  state = { backPressTime: 0 };

  componentDidMount = async () => {
    // BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    // try {
    //   const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
    //     title: 'this is title',
    //     message: 'this is message',
    //   });
    //   console.log(granted);
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     console.log('가능');
    //   } else {
    //     console.log('불가능');
    //   }
    // } catch (err) {
    //   console.warn(err);
    // }
  };

  componentWillUnmount = () => {
    // BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
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

  onMessage = (event, navigation) => {
    // console.log('msg from web ->', event.nativeEvent.data, navigation);
    navigation.navigate('Camera');
  };

  setWebviewReference = webview => {
    console.log(webview);
    this.webview = webview;
  };

  render() {
    // const url = 'http://192.168.10.53:3000';
    const url = 'http://van.aty.kr';

    if (Platform.OS === 'ios') {
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
            // onMessage={event => screenProps.onMessage(event, navigation)}
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
          // onMessage={event => screenProps.onMessage(event, navigation)}
          source={{ uri: url }}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}
