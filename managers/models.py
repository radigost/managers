from __future__ import unicode_literals
from django.contrib.postgres.fields import JSONField

from django.db import models

# Create your models here.
class Company(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)

class Person(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    company_id=models.ForeignKey(Company, on_delete=models.CASCADE,default=1)
    stats = JSONField(default={
        'money':0
    })


class Users(models.Model):
    login   = models.CharField(max_length=30)
    password = models.CharField(max_length=30)


