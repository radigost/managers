modalTpl = require('./modal.jade')
class treeModalCtrl
  constructor:(@Restangular,@cookies)->
    @node  = @resolve.node
    @toAdd =
      text:""


  cancel:()=>
    @dismiss({$value: 'cancel'})
  save:()=>
    @Restangular.one('/api/v1/nodes/',@node.id).get().then (res)=>
      res.choice.push @selected.id
      s =  @cookies.getAll()
      res.customPUT('','','',{'X-CSRFToken':s.csrftoken}).then =>
        @node.answers.push @selected
  delete:(id)=>
    @Restangular.one('/api/v1/nodes/',@node.id).get().then (res)=>
      res.choice = _.pull(res.choice,id)
      s =  @cookies.getAll()
      res.customPUT('','','',{'X-CSRFToken':s.csrftoken}).then =>
        @node.answers = _.pullAllBy(@node.answers,[ {'id':id}],'id')
  close:()=>
      @close({$value: 'cancel'})
  create:(text)=>
     if @node.category == 'npc' then type = 'player' else type = 'npc'
     console.log @toAdd
     obj =
      "category": type
      "text": @toAdd.text
      "is_fail": null || @toAdd.is_fail
      "is_success": null
      "is_start": null
      "type": null || @toAdd.type
      "choice": []

     s =  @cookies.getAll()
     @Restangular.one('/api/v1/nodes/').post('',obj,'',{'X-CSRFToken':s.csrftoken}).then (res)=>
        @selected = res
        @save()
  setFailure:()=>
    @toAdd.is_fail = true
    @toAdd.is_success = null
    @toAdd.type = 'failure'
  setSuccess:()=>
    @toAdd.is_fail = null
    @toAdd.is_success = true
    @toAdd.type = 'success'
  setDefault:()=>
    @toAdd.is_fail = null
    @toAdd.is_success = null
    @toAdd.type = ''



angular.module('app').component 'modalComponent',
  template: modalTpl()
  bindings:
    resolve: '<'
    close: '&'
    dismiss: '&'
  controller:['Restangular','$cookies',treeModalCtrl]

