# -*- coding: utf-8 -*-

from rest_framework import viewsets
from managers.views import Person,Company
from .serializers import PersonSerializer,CompanySerializer



class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer