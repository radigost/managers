
class modalCtrl
  constructor:(@uibModalInstance)->
#    console.log @reason
  cancel:()=>
    @uibModalInstance.close()




angular.module('app')
.controller('modalCtrl',['$uibModalInstance',modalCtrl])