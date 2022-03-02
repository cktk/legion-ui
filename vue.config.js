const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 9999,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
                ws: true
            },
            '/foo': {
                target: '<other_url>'
            }
        }
    },
    // 打包时不生成.map文件 避免看到源码
    productionSourceMap: false,
    // 部署优化
    configureWebpack: {
        plugins: [
            // GZIP压缩
            new CompressionPlugin({
                test: /\.js$|\.html$|\.css/, // 匹配文件
                threshold: 10240 // 对超过10k文件压缩
            })
        ]
    }
}