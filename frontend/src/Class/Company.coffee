class Company
  constructor:->
    @current={}
    @items=[
        {id:1,name:"Восток Инк",staff:[],description:"Самая крутая компания в мире",size:"***"}
        {id:2,name:"Дальний восток ",staff:[],description:"Работают в строительсте. крутые ребята",size:"***"}
        {id:3,name:"Ближний Восток",staff:[],description:"Самая крутая компания в мире",size:"**"}
        {id:4,name:"Опиум для народа",staff:[],description:"Самая крутая компания в мире",size:"**"}
        {id:5,name:"Все Вани",staff:[],description:"Самая крутая компания в мире",size:"**"}
        {id:6,name:"Дик и к ",staff:[],description:"Самая крутая компания в мире",size:"****"}
        {id:7,name:"Бразерхуд оф стил",staff:[],description:"Военная компания с большой сетью по всей стране",size:"*"}
        {id:8,name:"Сестрихуд оф вуд",staff:[],description:"Самая крутая компания в мире",size:"***"}
        {id:9,name:"Бардук",staff:[],description:"Самая крутая компания в мире",size:"***"}
        {id:10,name:"Вести",staff:[],description:"Самая крутая компания в мире",size:"**"}
        {id:11,name:"Бардлагок инкорпорейтед",staff:[],description:"Самая крутая компания в мире",size:"*"}
        {id:12,name:"Богатые беженцы",staff:[],description:"Самая крутая компания в мире",size:"****"}
        {id:13,name:"Богач и Богач",staff:[],description:"Самая крутая компания в мире",size:"**"}
      ]


  selectCurrent:(id)=>
    @current = _.find @items,(element)=>
        element.id == _.toInteger id


module.exports = Company