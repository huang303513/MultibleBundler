const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

let config = {
  // 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
  // 类型: string
  // 默认: process.cwd() 当前目录
  context: __dirname,
  // 入口
  // 类型： string | [string] | object { <key>: string | [string] } | (function: () => string | [string] | object { <key>: string | [string] })
  entry: {
    // 对象语法可以 跟
    app: "./src/app.js",
    vendors: "./src/vendors.js"
  },
  // 出口
  output: {
    chunkFilename: "bundle.[id].[name].[hash].[chunkhash].js",
    filename: "bundle.[id].[name].[hash].[chunkhash].js",
    path: path.join(__dirname, "../dist"), // 对应一个绝对路径，此路径是你希望一次性打包的目录。
    publicPath: "", // 静态文件的
    crossOriginLoading: false | "anonymous" | "use-credentials",
    devtoolLineToLine: false | { test, include, exclude } | true,
    library: "ajax", // 导出的变量名 或者 模块名
    libraryTarget: "var" | "this" | "commonjs" | "commonjs2" | "amd" | "umd",
    libraryExport: "default",
    auxiliaryComment: "我是注释!" // 在和 output.library 和 output.libraryTarget 一起使用时，此选项允许用户向导出容器(export wrapper)中插入注释。要为 libraryTarget 每种类型都插入相同的注释，将 auxiliaryComment 设置为一个字符串：
  },
  // 模块 就是俗称的loader
  module: {
    noParse: content => /jquery|lodash/.test(content),
    rules: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, "../src")],
        exclude: /node_modules/,
        // loader:'css-loader', Rule.loader 是 Rule.use: [ { loader } ] 的简写
        // Rule.options 和 Rule.query 是 Rule.use: [ { options } ] 的简写
        // resource: {
        // test: /\.js$/,
        // include: [ path.join(__dirname, '../src/renderer') ],
        // exclude: /node_modules/,
        // }
        // import Foo from './foo.css?inline'
        // resourceQuery: /inline/,
        parser: {
          // 语法分析器
          amd: false, // 禁用 AMD
          commonjs: false, // 禁用 CommonJS
          system: false, // 禁用 SystemJS
          harmony: false, // 禁用 ES2015 Harmony import/export
          requireInclude: false, // 禁用 require.include
          requireEnsure: false, // 禁用 require.ensure
          requireContext: false, // 禁用 require.context
          browserify: false, // 禁用特殊处理的 browserify bundle
          requireJs: false, // 禁用 requirejs.*
          node: false, // 禁用 __dirname, __filename, module, require.extensions, require.main 等。
          node: {} // 在模块级别(module level)上重新配置 node 层(layer)
        },
        // Rule.loader 是 Rule.use: [ { loader } ] 的简写
        use: [
          {
            loader: "babel-loader",
            options: {}
          }
        ]
      }
    ]
  },
  // 路径目录
  resolve: {
    // 创建 import 或 require 的别名
    alias: {
      Utilities: path.join(__dirname, "src/utilities/"),
      Templates: path.join(__dirname, "src/templates/")
    },
    aliasFields: ["browser"], // 'module', 'main' 这个 browser 必须在被引用的模块的package.json 配置才能生产，并且只对这个模块生效。
    extensions: [".wasm", ".mjs", ".js", ".json"],

    descriptionFiles: ["package.json"], // 用于描述的 JSON 文件
    mainFields: ["browser", "module", "main"], // 当 target 属性设置为 webworker, web 或者没有指定，默认值为：['browser', 'module', 'main'] 对于其他任意的 target（包括 node），默认值为：  ['module', 'main']
    mainFiles: ["index"], // 解析目录时要使用的文件名。
    modules: ["node_modules"], // 告诉 webpack 解析模块时应该搜索的目录。
    enforceExtension: false, // 如果配置为  true  所有导入语句都必须要带文件后缀， 例如开启前  import './foo'  能正常工作，开启后就必须写成  import './foo.js'
    enforceModuleExtension: false, // nforceModuleExtension  和  enforceExtension  作用类似，但  enforceModuleExtension  只对  node_modules  下的模块生效。  enforceModuleExtension  通常搭配  enforceExtension  使用，在  enforceExtension:true  时，因为安装的第三方模块中大多数导入语句没带文件后缀， 所以这时通过配置  enforceModuleExtension:false  来兼容第三方模块。

    unsafeCache: true, // unsafeCache: /src\/utilities/ regex | array | boolean 启用，会主动缓存模块，但并不安全。传递 true 将缓存一切。默认：unsafeCache: true
    plugins: [new DirectoryNamedWebpackPlugin()]
  },
  // loader的路径目录解析
  resolveLoader: {
    // 这组选项与上面的 resolve 对象的属性集合相同，但仅用于解析 webpack 的 loader 包。默认：
    modules: ["node_modules"],
    extensions: [".js", ".json"],
    mainFields: ["loader", "main"],

    moduleExtensions: ["-loader"] // 解析 loader 时，用到扩展名(extensions)/后缀(suffixes)。从 webpack 2 开始，我们 强烈建议 使用全名，例如 example-loader，以尽可能清晰。然而，如果你确实想省略 -loader，也就是说只使用 example，则可以使用此选项来实现：
  },
  // 模式
  mode: "production", // 可能的值有：none, development 或 production（默认）。提供 mode 配置选项，告知 webpack 使用相应环境的内置优化。
  // 优化
  optimization: {
    minimize: false, // 压缩
    minimizer: [
      // 允许你通过提供一个或多个定制过的 TerserPlugin 实例，覆盖默认压缩工具(minimizer)。
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      })
      //   Or, as function:
      //   (compiler) => {
      //     const TerserPlugin = require('terser-webpack-plugin');
      //     new TerserPlugin({ /* your config */ }).apply(compiler);
      //   }
    ],
    splitChunks: {
      // 模块组 缓存组概念
      chunks: "async", // 默认只作用于异步模块，‘all’时对所有模块生效， ‘initial’对同步模块有效
      minSize: 30000, // 新产出的vendor-chunk的大小要大于30kb
      minChunks: 2, //共同引用超过大于等于2次就可以分割成公共模块
      maxAsyncRequsets: 5, // 并行请求vendor-chunk的数量不能超出5个
      maxInitialRequests: 3, // 对于entry-chunk,并行加载的vendor-chunk不能超出3个
      name: true, //神奇的true值将会自动根据切割之前的代码块和缓存组键值(key)自动分配命名,否则就需要传入一个String或者function.
      // 命名与入口名称相同时,入口将会被移除.
      automaticNameDelimiter: "~",

      cacheGroups: {
        // 缓存组默认继承splitChunks的配置项,但是test,priority和reuseExistingChunk只能在缓存组中被配置.
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2,

          priority: 0,
          minSize: 0
        },
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        },
        default: {
          // false 来禁用 默认缓存组,
        }
      } //end cacheGroups
    }, // end splitChunks

    // runtimeChunk: true,// 或 "multiple" 以下的别名
    // runtimeChunk: {
    //     name: entrypoint => `runtime~${entrypoint.name}`
    // },
    // runtimeChunk: 'single', // 以下的别名
    runtimeChunk: {
      name: "runtime"
    },
    noEmitOnErrors: true, // 在编译出错时，使用 optimization.noEmitOnErrors 来跳过生成阶段(emitting phase)。
    nodeEnv: "production", // 告知 webpack 将 process.env.NODE_ENV 设置为一个给定字符串。如果 optimization.nodeEnv 不是 false，则会使用 DefinePlugin，optimization.nodeEnv 默认值取决于 mode，如果为 falsy 值，则会回退到 "production"。
    //parent chunk中解决了的chunk会被删除
    removeAvailableModules: true,
    //删除空的chunks
    removeEmptyChunks: true,
    //合并重复的chunk
    mergeDuplicateChunks: true
  }, //end optimization
  // 插件
  plugins: [
    // mode : 'development'时的插件添加模式后可省略
    new webpack.NamedModulesPlugin(), // 在热加载时直接返回更新文件名，而不是文件的id。
    new webpack.NamedChunksPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),

    // mode : 'production'时的插件添加模式后可省略
    new TerserPlugin({ test: /\.js(\?.*)?$/i }), // js压缩优化 用terser-webpack-plugin替换掉uglifyjs-webpack-plugin解决uglifyjs不支持es6语法问题
    // new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
    new webpack.optimize.ModuleConcatenationPlugin(), // 将所有模块的作用域连接到一个闭包中，从而使代码在浏览器中具有更快的执行时间。
    new webpack.NoEmitOnErrorsPlugin(), //  在编译出错时，使用 optimization.noEmitOnErrors 来跳过生成阶段(emitting phase)。优化中有

    new CopyWebpackPlugin(), // 将单个文件或整个目录复制到构建目录
    new webpack.BannerPlugin(options), // 在每个生成的块的顶部添加横幅。
    new HtmlWebpackPlugin(), // 简单创建 HTML 文件，用于服务器访问
    new webpack.HotModuleReplacementPlugin(options), // 启用模块热替换(Enable Hot Module Replacement - HMR)
    new ExtractTextWebpackPlugin(options), // 从 bundle 中提取文本（CSS）到单独的文件
    new OptimizeCSSPlugin(options), // 压缩提取的CSS。我们使用这个插件是为了可以消除来自不同组件的重复CSS。
    // new webpack.optimize.CommonsChunkPlugin(options), // 从webpack 4中删除了  提取 chunks 之间共享的通用模块
    // new UglifyjsWebpackPlugin(),     // 优化js的插件可以使用在optimization.minimizer中 可以控制项目中 UglifyJS 的版本

    new webpack.optimize.AggressiveSplittingPlugin(options), // 将原来的 chunk 分成更小的 chunk
    new webpack.optimize.LimitChunkCountPlugin(options), // 设置 chunk 的最小/最大限制，以微调和控制 chunk  当你在编写代码时，可能已经添加了许多代码分离点(code split point)来实现按需加载(load stuff on demand)。在编译完之后，你可能会注意到有一些很小的 chunk - 这产生了大量 HTTP 请求开销。LimitChunkCountPlugin 插件可以通过合并的方式，后处理你的 chunk，以减少请求数。
    new webpack.optimize.MinChunkSizePlugin(options), // 确保 chunk 大小超过指定限制

    new webpack.AutomaticPrefetchPlugin(), // AutomaticPrefetchPlugin在观察更改的同时，提前发现以前编译的所有模块，试图改进增量构建时间。与预先发现单个模块的PrefetchPlugin相比。
    new webpack.ContextReplacementPlugin(), // 重写 require 表达式的推断上下文
    new webpack.DllPlugin(options), // 为了极大减少构建时间，进行分离打包
    new webpack.EnvironmentPlugin(["NODE_ENV", "DEBUG"]), // DefinePlugin 中 process.env 键的简写方式。
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // 从 bundle 中排除某些模块
    new webpack.LoaderOptionsPlugin(options), // 用于从 webpack 1 迁移到 webpack 2
    new webpack.NormalModuleReplacementPlugin(resourceRegExp, newResource), // 替换与正则表达式匹配的资源
    new webpack.ProvidePlugin(options), // 不必通过 import/require 使用模块
    new webpack.SourceMapDevToolPlugin(options), // 对 source map 进行更细粒度的控制
    new webpack.EvalSourceMapDevToolPlugin(options), // 对 eval source map 进行更细粒度的控制

    new CompressionWebpackPlugin(), // 可以压缩成gzip 预先准备的资源压缩版本，使用 Content-Encoding 提供访问服务
    new ZopfliWebpackPlugin(options), // 通过 node-zopfli 将资源预先压缩的版本 压缩
    new BabelMinifyWebpackPlugin(minifyOpts, pluginOpts), // 使用 babel-minify进行压缩
    new I18nWebpackPlugin(languageConfig, optionsObj), // 为 bundle 增加国际化支持
    new NpmInstallWebpackPlugin(options) // 在开发时自动安装缺少的依赖
  ],
  // devtool 你可以直接使用 SourceMapDevToolPlugin/EvalSourceMapDevToolPlugin 来替代使用 devtool 选项，切勿同时使用 devtool 选项和 SourceMapDevToolPlugin/EvalSourceMapDevToolPlugin 插件。
  // 类型: string false
  devtool: "cheap-eval-source-map",
  // 开发中  影响 webpack-dev-server(简写为：dev-server) 行为的选项。
  devServer: {
    contentBase: path.join(__dirname, "dist"), // 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要。 推荐使用一个绝对路径。
    compress: true, // 一切服务都启用 gzip 压缩：
    port: 9000, // 端口号
    after: function(app, server) {
      // 在服务内部的所有其他中间件之后， 提供执行自定义中间件的功能。
    },
    before: function(app, server) {
      // 在服务内部的所有其他中间件之前， 提供执行自定义中间件的功能。 这可以用来配置自定义处理程序，
      app.get("/some/path", function(req, res) {
        res.json({ custom: "response" });
      });
    },
    allowedHosts: ["host.com", "host2.com"], // 此选项允许你添加白名单服务，允许一些开发服务器访问。
    color: true, // 启用/禁用控制台的彩色输出。
    lazy: true, // lazy mode(惰性模式)
    filename: "bundle.js", // 在 lazy mode(惰性模式) 中，只有在请求 /bundle.js 时候，才会编译 bundle。
    headers: {
      // 在所有响应中添加首部内容：
      "X-Custom-Foo": "bar"
    },
    historyApiFallback: true, // 使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。devServer.historyApiFallback 默认禁用。通过传入以下启用：
    host: "0.0.0.0", // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定如下：
    hot: true, // 启用 webpack 的 模块热替换 功能：注意，必须有 webpack.HotModuleReplacementPlugin 才能完全启用 HMR。如果 webpack 或 webpack-dev-server 是通过 --hot 选项启动的，那么这个插件会被自动添加，所以你可能不需要把它添加到 webpack.config.js 中。关于更多信息，请查看 HMR 概念 页面。
    hotOnly: true, // 启用热模块替换（请参阅devserver.hot），而不将页面刷新作为生成失败时的回退。
    // boolean object
    // https: true,  //  默认情况下，dev-server 通过 HTTP 提供服务。也可以选择带有 HTTPS 的 HTTP/2 提供服务：
    https: {
      key: fs.readFileSync("/path/to/server.key"),
      cert: fs.readFileSync("/path/to/server.crt"),
      ca: fs.readFileSync("/path/to/ca.pem")
    },
    index: "index.html", // 被作为索引文件的文件名。
    inline: true, // 推荐使用 模块热替换 的内联模式，
    noInfo: true, // 告诉 dev-server 隐藏 webpack bundle 信息之类的消息。devServer.noInfo 默认禁用。
    // boolean string
    open: "Google Chrome", // 告诉 dev-server 在 server 启动后打开浏览器。默认禁用。
    openPage: "/different/page", // 指定打开浏览器时的导航页面。
    // boolean object: { boolean errors, boolean warnings }
    overlay: {
      // 如果想要显示警告和错误：
      warnings: true,
      errors: true
    },
    // object [object, function]
    // proxy: { // 请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users。
    //     '/api': 'http://localhost:3000'
    // },
    // '/api': {  // 如果你不想始终传递 /api ，则需要重写路径：
    //     target: 'http://localhost:3000',
    //     pathRewrite: {'^/api' : ''}
    // },
    // '/api': { // 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受，修改配置如下：
    //     target: 'https://other-server.example.com',
    //     secure: false
    // },
    // '/api': { // 有时你不想代理所有的请求。可以基于一个函数的返回值绕过代理。
    //     target: 'http://localhost:3000',
    //     bypass: function(req, res, proxyOptions) {
    //       if (req.headers.accept.indexOf('html') !== -1) {
    //         console.log('Skipping proxy for browser request.');
    //         return '/index.html';
    //       }
    //     }
    // },
    proxy: [
      {
        //如果你想要代理多个路径特定到同一个 target 下，你可以使用由一个或多个「具有 context 属性的对象」构成的数组：
        context: ["/auth", "/api"],
        target: "http://localhost:3000"
      }
    ],
    // publicPath: '/assets/', // 将 bundle 放在指定目录下：现在可以通过 http://localhost:8080/assets/bundle.js 访问 bundle。
    publicPath: "http://localhost:8080/assets/", // 也可以使用一个完整的 URL。这是 模块热替换 所必需的。
    quiet: true, // 启用 devServer.quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    socket: "socket", // 用于监听的 Unix socket（而不是 host）。
    staticOptions: {
      // 这只有在使用 devServer.contentBase 是一个 string 时才有效。 可以用于对 contentBase 路径下提供的静态文件，进行高级选项配置。有关可能的选项，请查看 Express文档。
      redirect: false
    },
    // string: 'none' | 'errors-only' | 'minimal' | 'normal' | 'verbose' object
    stats: "errors-only",
    useLocalIp: true, // 此选项允许浏览器使用本地 IP 打开。
    watchContentBase: true, // 告知 dev-server，serve(服务) devServer.contentBase 选项下的文件。开启此选项后，在文件修改之后，会触发一次完整的页面重载。
    watchOptions: {
      // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询： 如果这对文件系统来说太重了的话，你可以修改间隔时间（以毫秒为单位），将其设置为一个整数。
      poll: true
    },
    // boolean: false function (filePath)
    writeToDisk: filePath => {
      return /superman\.css$/.test(filePath);
    }
  },
  // 构建目标 string | function (compiler)
  // target:'web', // async-node electron-main electron-renderer node node-webkit web  webworker
  target: compiler => {
    compiler.apply(
      new webpack.JsonpTemplatePlugin(options.output),
      new webpack.LoaderTargetPlugin("web")
    );
  },
  // boolean: false  是否开启观察模式
  watch: true,
  watchOptions: {
    aggregateTimeout: 300, //当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位：
    poll: 1000, // 每秒检查一次变动
    // ignored: /node_modules/, //对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用。这个选项可以排除一些巨大的文件夹，例如 node_modules：
    ignored: ["files/**/*.js", "node_modules"]
  },
  // string object function regex 外部扩展不被webpack打包的模块
  externals: {
    lodash: {
      commonjs: "lodash",
      amd: "lodash",
      root: "_" // 指向全局变量
    }
  },
  // 这些选项可以配置是否 polyfill 或 mock 某些 Node.js 全局变量和模块。这可以使最初为 Node.js 环境编写的代码，在其他环境（如浏览器）中运行。
  node: {
    console: false,
    global: true,
    process: true,
    __filename: "mock",
    __dirname: "mock",
    Buffer: true,
    setImmediate: true
    // 更多选项，请查看“其他 Node.js 核心库”。
  },
  // 性能
  performance: {
    hints: false, // false | "error" | "warning"
    maxEntrypointSize: 400000, // 入口起点表示针对指定的入口，对于所有资源，要充分利用初始加载时(initial load time)期间。此选项根据入口起点的最大体积，控制 webpack 何时生成性能提示。默认值是：250000 (bytes)。
    maxAssetSize: 100000, // 资源(asset)是从 webpack 生成的任何文件。此选项根据单个资源体积，控制 webpack 何时生成性能提示。默认值是：250000 (bytes)。
    assetFilter: function(assetFilename) {
      //此属性允许 webpack 控制用于计算性能提示的文件
      return assetFilename.endsWith(".js");
    },
    // 统计信息(stats)  如果你不希望使用 quiet 或 noInfo 这样的不显示信息，而是又不想得到全部的信息，只是想要获取某部分 bundle 的信息，使用 stats 选项是比较好的折衷方式。
    // 对于 webpack-dev-server，这个属性要放在 devServer 对象里。在使用 Node.js API 时，此选项无效。
    stats: "errors-only"
  }
};
