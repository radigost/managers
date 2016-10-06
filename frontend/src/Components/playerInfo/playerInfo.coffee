tpl = require('./playerInfo.jade')

class playerInfoCtrl
  constructor:(@Restangular)->
  $onInit:()=>
  goToProfile:()=>
    @router.navigate(['Profile']);
angular.module('app').component('playerInfo',{
  template:tpl()
  controller:['Restangular',playerInfoCtrl]
  controllerAs:'ctrl'
  bindings:
    player:'<'
    router:'<'
})



