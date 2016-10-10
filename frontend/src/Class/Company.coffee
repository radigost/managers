class Company
  constructor:(@Restangular,@localStorage)->
    @current={}
    @items=[]


  selectCurrent:(id)=>
    @Restangular.one('api/v1/companies/',id).get().then (res)=>
      @current = res
      return



angular.module('app').service('Company', [
  'Restangular'
  '$localStorage'
  Company
])





module.exports = Company