const path = require('path')

//bundles all imports and creates it into the bundle.js file
module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    //watches the file, and everytime it changes, it rebundles it
    watch: true
}