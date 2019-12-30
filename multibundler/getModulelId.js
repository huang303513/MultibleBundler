const pathSep = require('path').sep;
const plaformModules = require('./platformMap.json');
const useIndex = true;//是否使用递增的数字作为模块的id，如果为false则使用模块相对的路径名作为模块id
let curModuleId = -100;//基础包ModuleId
let curBuzModuleId = -100;//业务包ModuleId
let baseModuleIdMap = [];
let buzModuleIdMap = [];
const fs=require("fs");
var baseMappingPath;
var buzMappingPath;
var moduleIdPrefx = null;

function randomString(len){
	//默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	var tempLen = chars.length, tempStr='';
	for(var i=0; i<len; ++i){
		tempStr += chars.charAt(Math.floor(Math.random() * tempLen ));
	}
	return tempStr;
}



/** 通过自增长的index来确定moduleID，优点是能使用rambundle且减小了bundle包的大小，隐藏了模块路径，提升安全性，缺点是需要保存和依赖已经打包进去的模块的路径和id的对应信息，需要注意打包顺序和重复依赖的打包模块*/
function getModuleIdByIndex(projectRootPath,path,entry,isBuz){

  if (!moduleIdPrefx) {
      moduleIdPrefx = new Date().getTime() + '' + randomString(10);
  }

  if(curModuleId==-100) {
    curModuleId =  - 1;//基础包的Module都是从0开始的
  }
  if(baseMappingPath==null) {
    baseMappingPath = projectRootPath + pathSep + "platformMap.json";
  }
  // 如果是打基础包第一个文件并且基础包的配置文件baseMappingPath存在，则读取以前基础包的配置并且设置基础包下一个id
  if(baseModuleIdMap.length == 0){
    // if(fs.existsSync && fs.existsSync(baseMappingPath)){
    //   baseModuleIdMap = require(baseMappingPath);
    //   curModuleId = baseModuleIdMap[baseModuleIdMap.length-1].id;
    // } else {
      baseModuleIdMap = plaformModules;
    // }
  }
  if(isBuz){
        if (buzMappingPath == null) {
            buzMappingPath = projectRootPath + pathSep + entry.replace(".js", "") + "Map.json";
        }
        if (buzModuleIdMap.length == 0) {
          // if (fs.existsSync && fs.existsSync(buzMappingPath)) {
          //     buzModuleIdMap = require(buzMappingPath);
          //     curBuzModuleId = buzModuleIdMap[buzModuleIdMap.length - 1].id;
          // }
          // else if (curBuzModuleId == -100) {
              curBuzModuleId = 10000;
          // }
      }
  }
  let pathRelative = null;
  if (path.indexOf(projectRootPath) == 0) {
    pathRelative = path.substr(projectRootPath.length + 1);
  }
  // console.warn('baseModuleIdMap.length',baseModuleIdMap.length,'pathRelative',pathRelative);
  // 如果是在当前基础包中已经打包了，则直接返回id
  const findPlatformItem = baseModuleIdMap.find((value)=>{return value.path==pathRelative});
  const findBuzItem = buzModuleIdMap.find((value)=>{return value.path==pathRelative});
  if(findPlatformItem){
    return findPlatformItem.id;
  }else if(findBuzItem){
    return findBuzItem.id;
  }else {
    if(!isBuz) {//基础包
      // console.warn('pathRelative',pathRelative);
      curModuleId = ++curModuleId;
      baseModuleIdMap.push({id: curModuleId, path: pathRelative});
      //把当前路径和id写入基础包id的map
      // fs.writeFileSync && fs.writeFileSync(baseMappingPath, JSON.stringify(baseModuleIdMap));
      return curModuleId;
    }else{//业务包
      curBuzModuleId = ++curBuzModuleId;
      buzModuleIdMap.push({id: curBuzModuleId, path: pathRelative});
      // fs.writeFileSync && fs.writeFileSync(buzMappingPath, JSON.stringify(buzModuleIdMap));
      // return moduleIdPrefx + curBuzModuleId;
      return curBuzModuleId;
    }

  }

}

/** 根据模块路径返回moduleId，优点是简单且确保唯一，缺点是无法使用rambundle打包方式*/
function getModuleIdByName(projectRootPath,path){
  let name = '';
  if (path.indexOf('node_modules' + pathSep + 'react-native' + pathSep + 'Libraries' + pathSep) > 0) {
    name = path.substr(path.lastIndexOf(pathSep) + 1);
  } else if (path.indexOf(projectRootPath) == 0) {
    name = path.substr(projectRootPath.length + 1);
  }
  name = name.replace('.js', '');
  name = name.replace('.png', '');
  let regExp = pathSep == '\\' ? new RegExp('\\\\', "gm") : new RegExp(pathSep, "gm");
  name = name.replace(regExp, '_');//把path中的/换成下划线
  return name;
}

function getModuleId(projectRootPath,path,entry,isBuz){
  if(useIndex){
    return getModuleIdByIndex(projectRootPath,path,entry,isBuz);
  }
  return getModuleIdByName(projectRootPath,path);
}


module.exports={getModuleId}
