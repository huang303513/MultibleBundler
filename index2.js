/** @format */

import {AppRegistry} from 'react-native';
// import RNFS from 'react-native-fs';
// import { setCustomSourceTransformer } from 'react-native/Libraries/Image/resolveAssetSource';
import App2 from './App2';

// setCustomSourceTransformer((resolver) => {
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

//     const { asset = {}} = resolver;


//     const defaultAsset = resolver.defaultAsset();
//     console.warn('resolver.defaultAsset()===', defaultAsset);
//     // defaultAsset.uri =  documentPath + '/assets/package-ui-demo.png'; //+ '?platform=ios&hash=' + resolver.asset.hash;

//     return defaultAsset;
//   });

AppRegistry.registerComponent("reactnative_multibundler2", () => App2);
