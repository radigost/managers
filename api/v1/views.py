# -*- coding: utf-8 -*-

from rest_framework import viewsets
from managers.views import Person,Company,Npc
from managers.models import Industry,Node
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.decorators import list_route
from django.contrib.auth.models import User, Group
from .serializers import PersonSerializer,CompanySerializer,NpcSerializer,UserSerializer,GroupSerializer,IndustrySerializer,NodeSerializer
from django.shortcuts import get_object_or_404

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    def list(self, request, format=None):
        # owner = request.query_params['owner_id']
        owner = request.user.id
        queryset = Person.objects.filter(owner_id = owner)
        serializer = PersonSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        print str(pk)
        queryset = Person.objects.all()
        person = get_object_or_404(queryset, pk=pk)
        serializer = PersonSerializer(person)
        return Response(serializer.data)

    # def create(self, request):
    #     print str(request)
    #     super()


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class NpcViewSet(viewsets.ModelViewSet):
    queryset = Npc.objects.all()
    serializer_class = NpcSerializer

class IndustryViewSet(viewsets.ModelViewSet):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer


class NodeViewSet(viewsets.ModelViewSet):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer


    @list_route()
    def npc(self, request):
        npc = Node.objects.filter(category='npc')
        serializer = self.get_serializer(npc, many=True)
        return Response(serializer.data)

    @list_route()
    def player(self, request):
        player = Node.objects.filter(category='player')
        serializer = self.get_serializer(player, many=True)
        return Response(serializer.data)




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


class MyView(APIView):
    """
    A view that returns the count of active users in JSON.
    """
    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        user_id = request.user.id
        content = {'user_id': user_id}
        return Response(content)