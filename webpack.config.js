const path = require('path');

module.exports = {
    entry: './buz.config.js',
    output:{
        path: path.resolve(__dirname, './'),
        publicPath: './',
        library: "someLibName",
        libraryTarget: "commonjs2",
        //是否包含有用的文件路径信息生成的代码里，为boolean类型
        // pathinfoL:true,
        filename: "business.config.build.js",
        // globalObject: "this",
        library: 'MyLibrary',
    },
    // node: {
    //     fs: "empty"
    // },
    target: "node", //Node.js使用`require`语句加载 Chunk代码
}