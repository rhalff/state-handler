'use strict'

var takeArgs = Array.prototype.slice

function ObjectExec () {
  var fns = []
  var args = takeArgs.call(arguments)
  return {
    exec: function () {
      for (var i = 0; i < fns.length; i++) {
        for (var j = 0; j < fns[i].length; j++) {
          if (fns[i][j].apply(null, args) === false) {
            break
          }
        }
      }
    },
    on: function () {
      var args = takeArgs.call(arguments)
      var i = fns.push(Array.isArray(args[0]) ? args[0] : args) - 1
      return function off () {
        fns.splice(i, 1)
      }
    }
  }
}

module.exports = ObjectExec
