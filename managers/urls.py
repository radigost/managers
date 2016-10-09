# -*- coding: utf-8 -*-
from django.conf.urls import url
from .views import PersonViewSet,CompanyViewSet

from . import views



urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register/$', views.RegisterFormView.as_view()),
    url(r'^login/$', views.LoginFormView.as_view()),
    url(r'^logout/$', views.LogoutView.as_view()),

]