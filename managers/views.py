# -*- coding: utf-8 -*-

from django.shortcuts import render
from rest_framework import viewsets

from api.v1.serializers import PersonSerializer,CompanySerializer
from .models import Person,Company

def index(request):
    template = 'managers/index.html'
    context = {
        'latest_question_list': 5,
    }
    return render(request,template,context)

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer