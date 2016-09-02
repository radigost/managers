class modalCtrl
  constructor:(@uibModalInstance)->
#    console.log @service
#  $onInit:()=>
#    @service.init()
  cancel:()=>
#    @service.clearSelected()
    @uibModalInstance.dismiss(@event)
    return
  save:()=>
#    @service.add(@fleetItems).then ()=>
    @uibModalInstance.close()
#  hasNoModels:()=>
#    @service.models.items.length==0



modalCtrl.$inject=['$uibModalInstance']
angular.module('app').controller('modalCtrl',modalCtrl)
