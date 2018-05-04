// By default, this pack is loaded for server-side rendering.
// It must expose react_ujs as `ReactRailsUJS` and prepare a require context.
require("babel-polyfill");
require("lodash");
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs")
ReactRailsUJS.useContext(componentRequireContext)
