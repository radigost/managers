from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)


class Users(models.Model):
    login   = models.CharField(max_length=30)
    password = models.CharField(max_length=30)