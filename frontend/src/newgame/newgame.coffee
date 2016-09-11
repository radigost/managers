Player = require('../Class/player.coffee')
Company = require('../Class/Company.coffee')
tpl = require('./newgame.jade')

class gameCtrl
  constructor:()->
    @gameName = "Экран выбора персонажа"
    @player = new Player
    @elements =[1..10]
    @showMenu = false
    @stats = {
      items :[
        {id:1,caption:"Активность",value:5,max:9,min:1}
        {id:2,caption:"Связи",value:5,max:9,min:1}
        {id:3,caption:"Психология",value:5,max:9,min:1}
        {id:4,caption:"Интелект",value:5,max:9,min:1}
        {id:5,caption:"Интроверсия - Экстроверсия",value:3,max:3,min:1}
      ]
    }
    @specialties = {
      items:[
        {id:1,caption:"Холодные звонки",tooltip:""}
        {id:2,caption:"Любимец государства",tooltip:"Хорошо получается работать с гос. сектором"}
        {id:3,caption:"Прошаренный",tooltip:"Знает технологию по которой работает компания"}
        {id:4,caption:"Большой чек",tooltip:""}
        {id:5,caption:"Телефонный маньяк",tooltip:"Может делать огромное количество звонков,но на личных встречах ведет себя не очень"}
      ]
      current:{}
    }
  plus:(what)=>
    r = _.find @stats.items, {id:what}
    if r.value < r.max
      r.value++
    return
  minus:(what)=>
    r = _.find @stats.items, {id:what}
    if r.value > r.min
      r.value--
    return
  toggle:()=>
    console.log @showMenu
    @showMenu = !@showMenu
  chooseSpecialty:(id)=>
    @specialties.current = _.find @specialties.items, {id:id}
  startGame:(id)=>
    @$router.navigate(['Game', {playerAvatarId: id}])


  $onInit:()=>
  chooseAvatar:(id)=>
    @player.playerAvatarID =id





angular.module('app').component('newgame',{
  template:tpl()
  controller:[gameCtrl]
  controllerAs:'ctrl'
  bindings:
    $router:'<'
})

