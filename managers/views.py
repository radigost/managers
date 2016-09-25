# -*- coding: utf-8 -*-

from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.template import loader

def index(request):
    template = 'managers/index.html'
    context = {
        'latest_question_list': 5,
    }
    return render(request,template,context)

