tpl = require('./profile.jade')
require '../gameService.coffee'

class profileCtrl
  constructor:(@service,@Restangular)->
  $onInit:()=>

angular.module('app').component('profile',{
  template:tpl()
  controller:['gameService','Restangular',profileCtrl]
  controllerAs:'ctrl'
  bindings:
    $router:'<'
})



