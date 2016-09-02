class Player
  constructor:->
    @type = 'player'
    @name="Рикки Рома"
    @company="Гленгарри Глен Росс"
    @position="младший менеджер"
    @nodes = [
          {id:1,text:"Добрый день!"}
          {id:2,text:"А можно %LPRNAME%?"}
          {id:3,text:"А с кем я разговариваю?"}
          {id:4,text:"Менеджер по продажам %USERNAME%"}
          {id:5,text:"Это %USERNAME% с очень интересным предложением"}
          {id:6,text:"Эмм...я ошиблся номером!"}
          {id:7,text:"Да, хорошо, давайте запишу электронку"}
          {id:8,text:"Я знаю, вы врете, ни на каком он не совещании, вы просто не хотите меня с ним соединять!"}
          {id:9,text:"Видите ли, мы договаривались с ним созвониться после выставки...а когда он может освободиться?"}
          {id:10,text:"Хорошо, я может быть сам наберу чтобы уточнить о прочтении "}
          {id:11,text:"Это %FAKEUSERNAME% , никак не могу до него дозвониться по сотовому. Соедините пожалуйста"}
          {id:12,text:"Скажите, может кто то другой сможет со мной по этому вопросу переговорить?"}
          {id:13,text:"Скажите, А как можно связаться с %LPRNAME%?"}
          {id:14,text:"Нет, у меня к нему технический вопрос"}
          {id:15,text:"Нет, у меня к нему личный вопрос"}
        ]
    @tree=[
      {questionId:1,choices:[2,3]}
      {questionId:2,choices:[12]}
      {questionId:3,choices:[12]}
      {questionId:4,choices:[4,5,6,11]}
      {questionId:5,choices:[13]}
      {questionId:6,choices:[2]}
      {questionId:7,choices:[13]}
      {questionId:8,choices:[7,8,9]}
      {questionId:9,choices:[9,10]}
      {questionId:15,choices:[7]}
      {questionId:16,choices:[5,14,15]}
      {questionId:17,choices:[16]}
    ]
  findNode:(questionId)=>
    @branch  =_.find(@tree,{questionId:questionId})
    if @branch
      @questionArray = _.filter @nodes, (element)=>
          _.includes @branch.choices, element.id
    else
      @questionArray = []

  findCurrent:(questionId)=>
    @current = _.find(@nodes, id: questionId)
  fail:=>
    @current = {id:null,text:"Эммм..ну до свиданья"}
  succeed:=>
    @current = {id:null,text:"Да, спасибо большое"}

module.exports = Player