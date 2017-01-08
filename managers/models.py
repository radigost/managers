from __future__ import unicode_literals
from django.contrib.postgres.fields import JSONField

from django.db import models


# Create your models here.
class Company(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=350, default=None,null=True)
    size = models.IntegerField(default=None,null=True)
    industry = models.ForeignKey('Industry',on_delete=models.CASCADE,default=1)
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
    company = models.CharField(max_length=250)
    image_path = models.CharField(max_length=150, null=True,default=None)
    position = models.ForeignKey(Position, on_delete=models.SET_NULL, default=None,null=True)
    stats = JSONField(default={
        'money': 0
    })
    owner = models.ForeignKey('auth.User', related_name='persons',default=1)
    related_companies = models.ManyToManyField(Company)
    is_deleted= models.BooleanField(default=False)

    def __unicode__(self):
        return '%s, - %s in  %s ' % ( self.name,self.position,self.company)

class Npc(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    company = models.ForeignKey(Company, on_delete=models.CASCADE,default=None,null=True)
    image_path = models.CharField(max_length=150, null=True,default=None)
    position = models.ForeignKey(Position, on_delete=models.SET_NULL, default=None,null=True)
    stats = JSONField(default={
        'money': 0
    })

    def __unicode__(self):
        return '%s, - %s in  %s ' % ( self.name,self.position,self.company)


class Users(models.Model):
    login = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
class Industry(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    def __unicode__(self):
        return self.name

class Node(models.Model):
    TYPES = (
        ('player', 'player'),
        ('npc', 'npc'),
    )
    id = models.AutoField(primary_key=True)
    category = models.CharField(max_length=10,choices=TYPES)
    text  = models.CharField(max_length=250)
    is_fail = models.NullBooleanField()
    is_success = models.NullBooleanField()
    is_start = models.NullBooleanField()
    choice = models.ManyToManyField(
        "self",
        symmetrical=False,
        default=None,
        blank=True
    )
    type = models.CharField(max_length=15, default='', null=True,blank=True)
    def __unicode__(self):
        return self.text

# class ChoiceTree(models.Model):
#     # id = models.AutoField(primary_key=True)
#     question = models.ForeignKey(
#         Node,
#         related_name='question'
#                                  ),
#     choice = models.ForeignKey(
#         Node,
#         related_name="choices",
#     )