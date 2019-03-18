var path = require("path");

module.exports = {
    entry: "./src/index.tsx",

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    
    devServer: {
        publicPath: "/dist/",
        https: true
    },

    devtool: "inline-source-map",

    mode: "development",
    output: {
        filename: "app.bundle.js",
        path: path.resolve(__dirname, "dist")
    }
}