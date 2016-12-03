var ObservableCommand = require('./ObservableCommand').default;
var Option = require('commander').Option;

module.exports = new ObservableCommand();
module.exports.ObservableCommand = ObservableCommand;
module.exports.Option = Option;
