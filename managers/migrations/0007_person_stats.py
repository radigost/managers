# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-09-26 20:51
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('managers', '0006_auto_20160925_0719'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='stats',
            field=django.contrib.postgres.fields.jsonb.JSONField(default={'money': 0}),
        ),
    ]