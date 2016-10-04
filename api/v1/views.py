# -*- coding: utf-8 -*-

from rest_framework import viewsets
from managers.views import Person,Company,Npc
from .serializers import PersonSerializer,CompanySerializer,NpcSerializer



class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class NpcViewSet(viewsets.ModelViewSet):
    queryset = Npc.objects.all()
    serializer_class = NpcSerializer