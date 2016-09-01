# -*- coding: utf-8 -*-
from django.test import TestCase
from .views import answer, lookForAnswer, getArrayOfAnswers
from django.http import QueryDict, HttpRequest


# Create your tests here.

class QuestionMethodTests(TestCase):
    def test_sends_answers(self):
        question = "Hello!"
        a = answer(question).content
        test = len(a)
        self.assertGreater(test, 2, msg="Our answer is string and less then 2 symbols")

    def test_function_look_for_answer(self):
        question = "Hello!"
        a = lookForAnswer(question)
        test_array = ['Первый раз у нас?','Че надо?','Ну приве']
        test =  a in test_array
        self.assertTrue(test, msg="Our answer is not among answers")
        self.assertEquals(a, 'Первый раз у нас?', msg="Ответ должен быть на странный запрос - овтет по умолчанию")

    def test_can_understand_Wrong_http_requests(self):
        testHttp = QueryDict('q=1', mutable=True)
        a = lookForAnswer(testHttp)
        self.assertEquals(a, 'Первый раз у нас?', msg="Ответ не из нашего массива ответов")

    def test_can_understand_http_requests(self):
        t = HttpRequest()
        t.method = "GET"
        t.GET = QueryDict('q=2', mutable=True)
        a = lookForAnswer(t)
        self.assertEquals(a,'Ну приве',msg="Ответ не из нашего массива ответов")

    def test_can_understand_bad_question(self):
        t = HttpRequest()
        t.method = "GET"
        t.GET = QueryDict('q=50', mutable=True)
        a = lookForAnswer(t)
        self.assertEquals(a,'Первый раз у нас?', msg="Ответ выходит за границы вопросов")

    def test_can_call_get_array_of_answers(self):
        # отдается массив и возможных ответов
        a = getArrayOfAnswers()
        self.assertEquals(a,['Алло?'], msg="Ответ не из нашего массива ответов")
        a = getArrayOfAnswers(1)
        self.assertEquals(a[0],'Добрый день...', msg="Ответ не из нашего массива ответов")