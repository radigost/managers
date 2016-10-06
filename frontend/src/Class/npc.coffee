class Npc
  constructor:(@Restangular)->
    @type='npc'
    @tree = [
          {questionId:1,choices:[1,5]}
          {questionId:2,choices:[4]}
          {questionId:3,choices:[6]}
          {questionId:4,choices:[8]}
          {questionId:5,choices:[15]}
          {questionId:6,choices:[11]}
          {questionId:7,choices:[9]}
          {questionId:8,choices:[14]}
          {questionId:9,choices:[12]}
          {questionId:10,choices:[10]}
          {questionId:11,choices:[13]}
          {questionId:12,choices:[16]}
          {questionId:13,choices:[16]}
          {questionId:14,choices:[17]}
          {questionId:15,choices:[12]}
        ]
    @nodes = [
      {id:1,text:"Да, здравствуйте, чем можем вам помочь?",used:false }
      {id:2,text:"Да отошел он, не знаем когда будет..." ,used:false}
      {id:3,text:"Да не работают такие у нас..." ,used:false}
      {id:7,text:"И вам добрый день!" ,used:false}
      {id:4,text:"А кто его спрашивает?" ,used:false}
      {id:5,text:"Алло?" ,used:false}
      {id:6,text:"Меня зовут PERSONNAME" ,used:false}
      {id:8,text:"Вы знаете, он сейчас находится на совещании, но вы можете оставить информацию о вашей компании у нас на электронной почте" ,used:false}
      {id:9,text:"%EMAIL%, Можете высысылать на него информацию, и мы с вами свяжемся, если нам будет интересно" ,used:false}
      {id:10,text:"Нет не надо нас набирать, мы вас сами наберем, до свидания!" ,used:false,type:"failure"}
      {id:11,text:"Ну тогда всего доброго!" ,used:false,type:"failure"}
      {id:12,text:"Ну знаете, сегодня скорее всего уже не освободится, но можете позвонить завтра в районе обеда, попробую вас с ним соединить" ,used:false,type:"failure"}
      {id:13,text:"Да, конечно. Давайте соединю" ,used:false,type:"success"}
      {id:14,text:"Я извиняюсь, но мне кажется вы не долны сюда больше звонить, всего доброго!" ,used:false,type:"failure"}
      {id:15,text:"Я могу продиктовать вам электронную почту и вы вышлите на нее ваше предложение" ,used:false}
      {id:16,text:"А что вам конкретно нужно, вы хотите что то предложить?" ,used:false}
      {id:17,text:"А он о вас знает, как вас представить?" ,used:false}
      ]
    @loadedData = [
#      {id:1,name:"Мария",companyId:1,positionName:"Секретарь"}
#      {id:2,name:"Екатерина",companyId:2,positionName:"Главный секретарь"}
#      {id:3,name:"Василиса",companyId:3,positionName:"Помощник директора"}
#      {id:4,name:"Лейла",companyId:4,positionName:"Менеджер"}
#      {id:5,name:"Елена",companyId:5,positionName:"Секретарь"}
#      {id:6,name:"Анна",companyId:6,positionName:"Секретарь"}
#      {id:7,name:"Галина",companyId:7,positionName:"Помощник директора"}
#      {id:8,name:"Ольга",companyId:8,positionName:"Менеджер"}
#      {id:9,name:"Зарина",companyId:9,positionName:"Помощник директора"}
#      {id:10,name:"Гюйра",companyId:10,positionName:"Секретарь"}
#      {id:11,name:"Наталья",companyId:11,positionName:"Помощник директора"}
#      {id:12,name:"Оксана",companyId:12,positionName:"Секретарь"}
#      {id:13,name:"Ксения",companyId:13,positionName:"Менеджер"}
    ]
    @currentNpc={}

  init:(id)=>
    @currentNpc=_.find @loadedData,(element)=>
      element.id == _.toInteger id
  initNew:(Restangular)=>
    return new Npc(Restangular)
  findNode:(questionId)=>
    @branch  = _.find(@tree,{questionId:questionId})
  findCurrent:()=>
    choiceIndex = @branch.choices[0]
    @current =  _.find(@nodes, id: choiceIndex)

    if @current.text.indexOf("PERSONNAME")
      name = @currentNpc.name
      @current.text = _.replace(@current.text,'PERSONNAME',name)
  selectCurrent:(id)=>
    @Restangular.one('api/v1/npc/',id).get().then (res)=>
#      console.log res
      _.extend @,res
      return

  selectNpc:(id)=>
    @currentNpc=_.find @loadedData,(element)=>
      element.id == _.toInteger id


  fail:=>
    @current = {id:null,text:"Извините, Всего доброго! (звук кладущейся трубки)"}
  succeed:=>
    @current = {id:null,text:"Давайте соединю"}



angular.module('app').service('Npc', [
  'Restangular'
  Npc
])

module.exports = Npc