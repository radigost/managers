require '../gameService.coffee'
tpl = require('./companyList.jade')

class companyListCtrl
  constructor:(@service)->

  goToCompany:(id)=>
    @$router.navigate(['CompanyDetail', {companyId: id}]);




angular.module('app').component('companyList',{
  template:tpl()
  controller:['gameService',companyListCtrl]
  controllerAs:'ctrl'
  bindings:
    $router:'<'


})


