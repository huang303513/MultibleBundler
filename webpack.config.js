const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MangleJsClassPlugin = require("mangle-js-webpack-plugin");

module.exports = {
  entry: "./buz.config.js",
  output: {
    path: path.resolve(__dirname, "./"),
    publicPath: "./",
    library: "someLibName",
    libraryTarget: "commonjs2",
    //是否包含有用的文件路径信息生成的代码里，为boolean类型
    // pathinfoL:true,
    filename: ".xrnconfig.build.js",
    // globalObject: "this",
    library: "MyLibrary"
  },
  // inline: true,
  mode: "production",
  target: "node", //Node.js使用`require`语句加载 Chunk代码
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        cacheKeys: (defaultCacheKeys, file) => {
          defaultCacheKeys.myCacheKey = "myCacheKeyValue";
          return defaultCacheKeys;
        }
      })
    ] //压缩
  },
  plugins: [
    new TerserPlugin(),
    new MangleJsClassPlugin({
      // exclude: /(manifest.*js.*$)|(bundle.*js.*$)/,
      // include: /test\.js.*$/,
      algorithm: "obfuscator", // 'obfuscator(default)' || 'jjencode' || 'aaencode'
      algorithmConfig: {
        prefix: "focus", // config of jjencode
        compact: true,
        renameGlobals: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.7,
        splitStrings: true,
        splitStringsChunkLength: 30,
        stringArray: true,
        stringArrayEncoding: true,
        stringArrayThreshold: 0.75,
        target: 'node',
        transformObjectKeys: false,
        unicodeEscapeSequence: true,
        log: false // config of obfuscator 具体配置参考https://github.com/javascript-obfuscator/javascript-obfuscator
      }
    })
  ] //加密
};
