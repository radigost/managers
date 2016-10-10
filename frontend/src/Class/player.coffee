class Player
  constructor:(@Restangular,@localStorage,@q)->
    @type = 'player'
    @name=""
    @fakeName = "Иван Иванович"
    @company=""
    @money = ""
    @position=""
    @nodes =[]

    @tree=[]

  init:()=>
    @id = @localStorage.player.id
    @Restangular.one('api/v1/persons/',@id).get().then (res)=>
      _.extend @,res
    return
  loadNodes:()=>
    def = @q.defer()
    @Restangular.one('api/v1/nodes/player').get().then (res)=>
      @nodes = res
      def.resolve()
    def.promise
  loadTree:()=>
    def = @q.defer()
    @Restangular.one('api/v1/nodes/npc').get().then (res)=>
      @tree = res
      def.resolve()
    def.promise

  findNode:(questionId)=>
    @branch  =_.find(@tree,{id:questionId})

    if @branch
      @questionArray = _.filter @nodes, (element)=>
          _.includes @branch.choice, element.id

      _.forEach @questionArray,(element)=>
        if element.text.indexOf("%USERNAME%")
          name = @name
          element.text = _.replace(element.text,'%USERNAME%',name)
      _.forEach @questionArray,(element)=>
        if element.text.indexOf("%FAKEUSERNAME%")
          name = @fakeName
          element.text = _.replace(element.text,'%FAKEUSERNAME%',name)
      _.forEach @questionArray,(element)=>
        if element.text.indexOf("%LPRNAME%")
          name = "Михаила Сергеевича"
          element.text = _.replace(element.text,'%LPRNAME%',name)


          @fakeName
    else
      @questionArray = []

  findCurrent:(questionId)=>
    @current = _.find(@nodes, id: questionId)

  choosePlayer:(playerAvatarID)=>
    if playerAvatarID
      @playerAvatarID = playerAvatarID
  fail:=>
    @current = {id:null,text:"Эммм..ну до свиданья"}
  succeed:=>
    @current = {id:null,text:"Да, спасибо большое"}


angular.module('app').service('Player', [
  'Restangular'
  '$localStorage'
  '$q'
  Player
])


module.exports = Player