const { environment } = require('@rails/webpacker');
const merge = require('webpack-merge');

const nodeModulesLoader = environment.loaders.get('nodeModules');
if (!Array.isArray(nodeModulesLoader.exclude)) {
  nodeModulesLoader.exclude = (nodeModulesLoader.exclude == null) ?
    [] :
    [nodeModulesLoader.exclude];
}

nodeModulesLoader.exclude.push(/mapbox-gl/);

const cssModulesOptions = {
  // This must match the value of generateScopedName
  // in the .babelrc settings of react-css-modules.
  localIdentName: '[path]--[name]--[local]--[hash:base64:5]',
};

const CSSLoader = environment.loaders
  .get('moduleSass')
  .use.find(el => el.loader === 'css-loader');

CSSLoader.options = merge(CSSLoader.options, cssModulesOptions);

module.exports = environment;
