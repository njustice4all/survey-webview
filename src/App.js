import React, { Component } from 'react';
import { BackHandler, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';

import WebviewScreen from './screens/WebviewScreen';
import CameraScreen from './screens/CameraScreen';

const Root = StackNavigator(
  {
    Webview: {
      screen: WebviewScreen,
    },
    Camera: {
      screen: CameraScreen,
    },
  },
  {
    initialRouteName: 'Webview',
    headerMode: 'none',
  },
);

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

  setWebviewReference = webview => (this.webview = webview);

  render() {
    return (
      <Root
        screenProps={{
          onMessage: this.onMessage,
          setWebviewReference: this.setWebviewReference,
        }}
      />
    );
  }
}
