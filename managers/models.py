from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

class Question(models.Model):
    question = models.CharField(max_length=100)

class Answer(models.Model):
    question = models.ForeignKey(Question,on_delete=models.CASCADE)
    answer = models.CharField(max_length=100)

class Questions_rel_Answers(models.Model):
    question = models.ManyToManyField(Question)
    answer = models.ManyToManyField(Answer)