/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import PackageUIImage2 from './images/test/package-ui-demo-2.png';

const instructions = '业务2读取了业务1设置的全局变量，表明多个业务包是运行在同一个js环境中';

type Props = {};
export default class App2 extends Component<Props> {
    render() {
      let buz1GlobalParam = global.buz1Param;
        return (
            <View style={styles.container}>
                <Image style={styles.welcomeImage} source={PackageUIImage2}></Image>
                <Text style={styles.welcome}>{'欢迎来到业务2的世界！ 获取业务1的问候:'+buz1GlobalParam}</Text>
                <Text style={styles.instructions}>To get started, edit App2.js</Text>
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
});
