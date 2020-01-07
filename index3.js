/** @format */

import {AppRegistry} from 'react-native';
import React, {Component} from 'react';
import {TouchableOpacity, Platform, StyleSheet, Text, View} from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {App3_1,App3_2} from "./App3";


// import RNFS from 'react-native-fs';
// import { setCustomSourceTransformer } from 'react-native/Libraries/Image/resolveAssetSource';
// let documentPath = null;
// let mainBundlePath = null;

const App3 = createStackNavigator({
  App3_1: {screen: App3_1},
  App3_2: {screen: App3_2}
});

// // if (process.env.NODE_ENV_REAL === "test") {
//   // 定制资源的获取方式
//   // 由域名根目录调整为bundle所在目录
//   // 安卓使用drawable格式
//   setCustomSourceTransformer((resolver) => {
//     // resolver.serverUrl = 'file:///Users/huangchengdu/Library/Developer/CoreSimulator/Devices/8344B923-0773-49AD-AB5C-98326CD061D3/data/Containers/Data/Application/9112AD41-F256-4F7B-9B13-DE82E25CF822/Documents/';
//     console.warn('resolver====', resolver);
//     // console.warn('resolver.defaultAsset()===', resolver.defaultAsset());
//     // resolver.serverUrl = resolver.jsbundleUrl;
//     // if (Platform.OS === "android") {
//     //   return resolver.drawableFolderInBundle();
//     // }
//     if (!documentPath) {
//         documentPath = RNFS.DocumentDirectoryPath;
//     }
//     if (!mainBundlePath) {
//         mainBundlePath = RNFS.MainBundlePath;
//     }

//     const { asset = {}, jsbundleUrl} = resolver;
//     const { httpServerLocation, name, type, __packager_asset } = asset;

//     const defaultAsset = resolver.defaultAsset();
//     const { uri = ''} = defaultAsset;
//     console.warn('mainBundlePath==',mainBundlePath);
//     console.warn('resolver.defaultAsset()===', defaultAsset);
//     // const isInBundle = !!jsbundleUrl && jsbundleUrl.indexOf('')
//     if (__packager_asset && !!httpServerLocation && !!name && !!type) {
//       defaultAsset.uri =  documentPath + httpServerLocation + "/" + name + '.' + type;
//     }

//     return defaultAsset;
//   });
// // }


const xx = gestureHandlerRootHOC(createAppContainer(App3));
AppRegistry.registerComponent("reactnative_multibundler3", () => xx);
