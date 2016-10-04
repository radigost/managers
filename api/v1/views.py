# -*- coding: utf-8 -*-

from rest_framework import viewsets
from managers.views import Person,Company,Npc
from django.contrib.auth.models import User, Group
from .serializers import PersonSerializer,CompanySerializer,NpcSerializer,UserSerializer,GroupSerializer



class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class NpcViewSet(viewsets.ModelViewSet):
    queryset = Npc.objects.all()
    serializer_class = NpcSerializer
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer