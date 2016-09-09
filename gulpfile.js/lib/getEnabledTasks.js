var config = require('../config');
var compact = require('lodash/compact');

// Grouped by what can run in parallel
var initTasks = ['clean', 'csscomb'];
var linterTasks = ['eslint', 'sasslint'];
var assetTasks = ['fonts', 'images'];
var codeTasks = ['html', 'css', 'js'];

module.exports = function(env) {
  /**
   * Adds task arguments as required for different environments.
   * @param {string} task Task to add requirements to.
   * @return {string} The modified task, if arguments were added.
   */
  function matchFilter(task) {
    if (config.tasks[task]) {
      if (task === 'js') {
        task = env === 'production' ? 'webpack:production' : false;
      }
      return task;
    }
  }

  /**
   * Converts task to a boolean for the exists filter.
   * @param {string} value Value to convert.
   * @return {boolean} Boolean value.
   */
  function exists(value) {
    return Boolean(value);
  }

  return {
    initTasks: compact(initTasks.map(matchFilter).filter(exists)),
    assetTasks: compact(assetTasks.map(matchFilter).filter(exists)),
    codeTasks: compact(codeTasks.map(matchFilter).filter(exists)),
    linterTasks: compact(linterTasks.map(matchFilter).filter(exists))
  };
};
