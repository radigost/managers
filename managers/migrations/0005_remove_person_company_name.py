# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-09-25 07:17
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('managers', '0004_person_company_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='person',
            name='company_name',
        ),
    ]
