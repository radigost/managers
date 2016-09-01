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

def answer(request):
    response = lookForAnswer(request)
    return JsonResponse(response)

def lookForAnswer(requset):
    ansersarray = [
        {'question':1, 'answer': ['Первый раз у нас?', 'Че надо?', 'Ну приве'],'answersArray':['Добрый день...','А куда я попал?']},
        {'question':2, 'answer': ['Че надо?', 'Ну приве']}
    ]
    if not isinstance(requset, str) and hasattr(requset, 'method') and requset.method == 'GET':
        i = int(requset.GET.__getitem__('q'))
    else:
        i = 0
    if len(ansersarray[0]['answer']) >= i :
        t = ansersarray[0]['answer'][i]
    else:
        t = ansersarray[0]['answer'][0]
    print(t)
    p = getArrayOfAnswers(i)
    ans = {'answer': t, 'nextQuestions': p}

    # return json.dumps(ans)
    return ans

def getArrayOfAnswers( elementNumber = 0 ):
    answersArray = [
        ['Алло?'],
        ['Добрый день...', 'А куда я попал?'],


    ]
    return answersArray[elementNumber]
