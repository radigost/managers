#Player = require('../Class/player.coffee')
Company = require('../Class/Company.coffee')
tpl = require('./newgame.jade')

class gameCtrl
  constructor:(@localStorage,@Restangular,@cookies)->
    @images = []
    @gameName = "Экран выбора персонажа"
    @stats = {
      items :[
        {id:1,caption:"Активность",value:5,max:9,min:1,name:'activeness'}
        {id:2,caption:"Связи",value:5,max:9,min:1,name:'network'}
        {id:3,caption:"Психология",value:5,max:9,min:1,name:'psychology'}
        {id:4,caption:"Интелект",value:5,max:9,min:1,name:'intellect'}
        {id:5,caption:"Интроверсия - Экстроверсия",value:3,max:3,min:1,name:'introversion'}
      ]
    }
    @specialties = {
      items:[
        {id:2,caption:"Любимец государства",tooltip:"Хорошо получается работать с гос. сектором"}
        {id:3,caption:"Прошаренный",tooltip:"Знает технологию по которой работает компания"}
        {id:4,caption:"Большой чек",tooltip:"Получает дополнительную возможность успешно продать если чек большой"}
        {id:5,caption:"Телефонный маньяк",tooltip:"Может делать огромное количество звонков,но на личных встречах ведет себя не очень"}
      ]
    }
    @perks = {
      items:[
        {id:1,caption:"Парень с заводского",chosen:false}
        {id:2,caption:"Белый воротничок",chosen:false}
        {id:3,caption:"Раздолбай",chosen:false}
      ]
    }
    @indusrty={
      items:[
        {id:1,caption:"Строительство"}
        {id:2,caption:"Сельское Хозяйство"}
        {id:3,caption:"FMCG"}
        {id:4,caption:"Государственный сектор"}
      ]
    }
    @points = 5
  $onInit:()=>
    @Restangular.one('api/v1/persons').get().then (res)=>
      @players = res
      return
    @current =
    {
      stats:
        personality:
          activeness:5
          network:5
          psychology:5
          intellect:5
          introversion:5
        specialties:[@specialties.items[0]]
        knowProduct:1
        minCalls:7
        maxCalls:14
        perks:[]
        money:15
      image_path:''
      first_name:"Иван"
      last_name:"Иванов"
      company:"Абырвалг инкорпорейтед"
     }
    @generateImages()



  plus:(what)=>
    r = _.find @stats.items, {id:what}
    if @current.stats.personality[r.name] < r.max and @points>0
      @current.stats.personality[r.name]++
      @points--
    return
  minus:(what)=>
    r = _.find @stats.items, {id:what}
    if @current.stats.personality[r.name] > r.min
      @current.stats.personality[r.name]--
      @points++
    return
  toggle:()=>
    @showMenu = !@showMenu

  chooseSpecialty:(id)=>
    @current.specialties = [_.find @specialties.items, {id:id}]

    if @current.specialties[0].id==3
      @current.knowProduct = 5
    else
      @current.knowProduct = 1


    if @current.specialties[0].id==5
      @current.maxCalls = 25
    else
      @current.maxCalls = 15

  chooseIndustry:(id)=>
    @current.industry = _.find(@indusrty.items,{id:id})
  chooseAvatar:(image_path)=>
    @current.image_path = image_path


  startGame:(id)=>
    @$router.navigate(['Game', {playerAvatarId: id}])


  generateImages:()=>
    names=['manager','secretar']
    @images = []
    for name in names
      for i in [1..11]
        @images.push(name+i+'.png')
    @current.image_path  = @images[0]

  create:()=>
    s =  @cookies.getAll()
    @current.name = @current.first_name+@current.last_name
    @current.related_companies = [1..10]
    @current.owner = @localStorage.user.id
    @Restangular.one('/api/v1/persons/').post('',@current,'',{'X-CSRFToken':s.csrftoken}).then (res)=>
      return




angular.module('app').component('newgame',{
  template:tpl()
  controller:['$localStorage','Restangular','$cookies',gameCtrl]
  controllerAs:'ctrl'
  bindings:
    $router:'<'
})

