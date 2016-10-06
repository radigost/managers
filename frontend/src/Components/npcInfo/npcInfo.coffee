#require('../../Class/npc.coffee')
require('../../Class/factories.coffee')
tpl = require('./npcInfo.jade')

class npcInfoCtrl
  constructor:(@Restangular,@NpcFactory)->

  $onInit:()=>
#    console.log @id
    @npc = @NpcFactory(@Restangular)
    @npc.selectCurrent(@id)



angular.module('app').component('npcInfo',{
  template:tpl()
  controller:['Restangular','NpcFactory',npcInfoCtrl]
  controllerAs:'ctrl'
  bindings:
    id:'<'
#    $router:'<'
})



