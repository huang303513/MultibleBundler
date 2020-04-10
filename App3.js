/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TouchableOpacity, Platform, StyleSheet, Text, View, Image} from 'react-native';
import PackageUIImage from './images/test/package-ui-demo.png';

const image2Url = 'https://s.shmiao.net/shm-tutorial/guides/search-coupon-guide-jd-04.png';

const instructions = '业务3打包的时候依赖了react-navigation，这里展示业务包依赖第三方模块的例子';

type Props = {};
export class App3_1 extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> this.props.navigation.push('App3_2')} >
          <Text style={[styles.navBtn]}>1热更新研究-1699999</Text>
        </TouchableOpacity>
        <Image style={styles.welcomeImage} source={PackageUIImage}></Image>
        <Image style={styles.welcomeImage} source={{uri: image2Url}}></Image>
        <Text style={styles.welcome}>欢迎来到业务3 页面1的世界！</Text>
        <Text style={styles.instructions}>To get started, edit App31.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

export class App3_2 extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>欢迎来到业务3 页面2的世界！</Text>
        <Text style={styles.instructions}>To get started, edit App32.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  welcomeImage: {
    width: 30,
    height: 30,
    backgroundColor: 'green',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  navBtn: {
    fontSize: 20,
    textAlign: 'center',
    margin: 40,
    padding:15,
    backgroundColor: 'red',
    borderRadius:6
  },
});
