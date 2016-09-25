# -*- coding: utf-8 -*-
from django.conf.urls import url,include

from rest_framework import routers
from .views import PersonViewSet,CompanyViewSet

router = routers.DefaultRouter()
router.register(r'persons', PersonViewSet)
router.register(r'companies', CompanyViewSet)


urlpatterns = [
    url(r'api/v1/', include(router.urls))
]