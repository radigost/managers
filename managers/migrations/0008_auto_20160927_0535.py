# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-09-27 05:35
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('managers', '0007_person_stats'),
    ]

    operations = [
        migrations.RenameField(
            model_name='person',
            old_name='company_id',
            new_name='company',
        ),
    ]
