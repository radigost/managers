modalTpl = require('./modal.jade')
class treeModalCtrl
  constructor:(@Restangular,@cookies)->
    @node  = @resolve.node
#    console.log @resolve.tree

  cancel:()=>
    @dismiss({$value: 'cancel'})
  save:()=>
    @Restangular.one('/api/v1/nodes/',@node.id).get().then (res)=>
      res.choice.push @selected.id
      s =  @cookies.getAll()
      res.customPUT('','','',{'X-CSRFToken':s.csrftoken}).then =>
         @close({$value: 'cancel'})
  delete:(id)=>
    @Restangular.one('/api/v1/nodes/',@node.id).get().then (res)=>
      res.choice = _.pull(res.choice,id)
      s =  @cookies.getAll()
      res.customPUT('','','',{'X-CSRFToken':s.csrftoken}).then =>
         @close({$value: 'cancel'})
  create:(text)=>
     if @node.category == 'npc' then type = 'player' else type = 'npc'
     console.log type
     obj =
      "category": type
      "text": text
      "is_fail": null
      "is_success": null
      "is_start": null
      "type": null
      "choice": []

     s =  @cookies.getAll()
     @Restangular.one('/api/v1/nodes/').post('',obj,'',{'X-CSRFToken':s.csrftoken}).then (res)=>
        @selected = res
        @save()


angular.module('app').component 'modalComponent',
  template: modalTpl()
  bindings:
    resolve: '<'
    close: '&'
    dismiss: '&'
  controller:['Restangular','$cookies',treeModalCtrl]

