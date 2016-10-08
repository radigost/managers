# -*- coding: utf-8 -*-
from django.conf.urls import url,include

from rest_framework import routers
from views import PersonViewSet,CompanyViewSet,NpcViewSet,UserViewSet,GroupViewSet,IndustryViewSet,MyView,NodeViewSet

router = routers.DefaultRouter()
router.register(r'persons', PersonViewSet)
router.register(r'companies', CompanyViewSet)
router.register(r'npc', NpcViewSet)
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'industries', IndustryViewSet)
router.register(r'nodes', NodeViewSet)
# router.register(r'tree', TreeViewSet)


urlpatterns = [
    url(r'api/v1/', include(router.urls)),
    url(r'api/v1/my', MyView.as_view(),name='my')
]