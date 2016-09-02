tpl = require('./menu.jade');
class menuCtrl
  constructor:->
#    console.log 'menu',@

angular.module('app').component('menu',{
  template:tpl()
  controller:[menuCtrl]
  controllerAs:'ctrl'
})

