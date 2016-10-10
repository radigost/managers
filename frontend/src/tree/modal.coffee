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
#  selectItem:()=>
#    console.log @selected


angular.module('app').component 'modalComponent',
  template: modalTpl()
  bindings:
    resolve: '<'
    close: '&'
    dismiss: '&'
  controller:['Restangular','$cookies',treeModalCtrl]

