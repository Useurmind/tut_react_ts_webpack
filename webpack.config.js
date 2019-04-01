var path = require("path");

module.exports = {
    entry: {
        app: "./src/index.tsx"
    },

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" },
            { 
                test: /\.css$/,
                use: [
                    'style-loader', 
                    { loader: "css-modules-typescript-loader" },
                    {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    }
                ],
            }
        ]
    },
    
    devServer: {
        publicPath: "/dist/",
        https: true
    },

    devtool: "inline-source-map",

    mode: "development",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    }
}