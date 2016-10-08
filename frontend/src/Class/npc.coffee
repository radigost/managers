class Npc
  constructor:(@Restangular,@q)->
    @type='npc'
    @tree = []
    @nodes =[]
    @loadedData =[]


  initNew:(Restangular,q)=>
    return new Npc(Restangular,q)

  loadNodes:()=>
    def = @q.defer()
    @Restangular.one('api/v1/nodes/npc').get().then (res)=>
      @nodes = res
      def.resolve()
    def.promise
  loadTree:()=>
    def = @q.defer()
    @Restangular.one('api/v1/nodes/player').get().then (res)=>
      @tree = res
      def.resolve()
    def.promise
  findNode:(questionId)=>
    questionId = 3 if questionId == 1
    @branch  = _.find(@tree,{id:questionId})
    console.log @branch,questionId
  findCurrent:()=>
    choiceIndex = @branch.choice[0]
    @current =  _.find(@nodes, id: choiceIndex)
    if @current.text.indexOf("PERSONNAME")
      name = @name
      @current.text = _.replace(@current.text,'PERSONNAME',name)

  selectCurrent:(id)=>
    @Restangular.one('api/v1/npc/',id).get().then (res)=>
      _.extend @,res
      return

#  selectNpc:(id)=>
#    @currentNpc=_.find @loadedData,(element)=>
#      element.id == _.toInteger id


  fail:=>
    @current = {id:null,text:"Извините, Всего доброго! (звук кладущейся трубки)"}
  succeed:=>
    @current = {id:null,text:"Давайте соединю"}



angular.module('app').service('Npc', [
  'Restangular'
  '$q'
  Npc
])

module.exports = Npc