const pathSep = require('path').sep;
const path = require('path');
const plaformModules = require('./multibundler/platformMapping.json');
const getModuleId = require('./multibundler/getModulelId').getModuleId;
let entry;



function postProcessModulesFilter(module) {
  let projectRootPath = __dirname;
  // console.warn('module=====',JSON.stringify(module));
  const commandPath = path.resolve(process.cwd());
  // console.warn('commandPath',commandPath);
  projectRootPath = commandPath;
  if (plaformModules == null || plaformModules.length == 0) {
    console.log('请先打基础包');
    process.exit(1);
    return false;
  }
  const path1 = module['path']
  if (path1.indexOf('.png') > 0) {
    console.warn('path1==',path1);
  }
  if (path1.indexOf("__prelude__") >= 0 ||
    path1.indexOf("/node_modules/react-native/Libraries/polyfills") >= 0 ||
    path1.indexOf("source-map") >= 0 ||
    path1.indexOf("/node_modules/metro/src/lib/polyfills/") >= 0) {
    return false;
  }
  if (module['path'].indexOf(pathSep + 'node_modules' + pathSep) > 0) {
    if ('js' + pathSep + 'script' + pathSep + 'virtual' == module['output'][0]['type']) {
      return true;
    }
    // console.warn('projectRootPath',projectRootPath,'path',path);
    const name = getModuleId(projectRootPath,path1);
    if (plaformModules.indexOf(name) >= 0) {
      return false;
    }
  }
  return true;
}

function createModuleIdFactory() {
  const projectRootPath = path.resolve(process.cwd());;
  return path1 => {
    let name = getModuleId(projectRootPath,path1,entry,true);
    return name;
  };
}

function getModulesRunBeforeMainModule(entryFilePath) {
  entry = entryFilePath;
  return [];
}

module.exports = {
  // transformer: {
  //   getTransformOptions: async () => ({
  //     transform: {
  //       experimentalImportSupport: false,
  //       inlineRequires: false,
  //     },
  //   }),
  // },
  // resolver: {
  //   // assetExts: ['png'],
  //   sourceExts: ['ts', 'js', 'json', 'png']
  // },
  serializer: {
    createModuleIdFactory: createModuleIdFactory,
    processModuleFilter: postProcessModulesFilter,
    getModulesRunBeforeMainModule:getModulesRunBeforeMainModule
  }
};
