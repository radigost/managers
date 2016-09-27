from __future__ import unicode_literals
from django.contrib.postgres.fields import JSONField

from django.db import models


# Create your models here.
class Company(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)

    def __unicode__(self):
        return self.name

class Position(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150, null=True)

    def __unicode__(self):
        return self.name

class Person(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, default=1)
    image_path = models.CharField(max_length=150, null=True)
    position = models.ForeignKey(Position, on_delete=models.SET_NULL, default=None,null=True)
    stats = JSONField(default={
        'money': 0
    })


    def __unicode__(self):
        return '%s, - %s in  %s ' % ( self.name,self.position,self.company)





class Users(models.Model):
    login = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
