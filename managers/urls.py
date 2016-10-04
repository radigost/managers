# -*- coding: utf-8 -*-
from django.conf.urls import url,include,patterns
# from rest_framework import routers
from .views import PersonViewSet,CompanyViewSet

from . import views

# router = routers.DefaultRouter()
# router.register(r'persons', PersonViewSet)
# router.register(r'companies', CompanyViewSet)


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register/$', views.RegisterFormView.as_view()),
    url(r'^login/$', views.LoginFormView.as_view()),
    url(r'^logout/$', views.LogoutView.as_view()),
    # url(r'api/v1/', include(router.urls))

]