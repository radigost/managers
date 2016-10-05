# -*- coding: utf-8 -*-
from django.conf.urls import url,include

from rest_framework import routers
from views import PersonViewSet,CompanyViewSet,NpcViewSet,UserViewSet,GroupViewSet,IndustryViewSet,MyView

router = routers.DefaultRouter()
router.register(r'persons', PersonViewSet)
router.register(r'companies', CompanyViewSet)
router.register(r'npc', NpcViewSet)
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'industries', IndustryViewSet)


urlpatterns = [
    url(r'api/v1/', include(router.urls)),
    url(r'api/v1/my', MyView.as_view(),name='my')
]