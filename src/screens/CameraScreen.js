import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class CameraSceen extends Component {
  render() {
    console.log(this.props);
    return (
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <Text>안녕?</Text>
      </View>
    );
  }
}
