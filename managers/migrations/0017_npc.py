# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-10-01 18:29
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('managers', '0016_company_size'),
    ]

    operations = [
        migrations.CreateModel(
            name='Npc',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('image_path', models.CharField(default=None, max_length=150, null=True)),
                ('stats', django.contrib.postgres.fields.jsonb.JSONField(default={'money': 0})),
                ('company', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='managers.Company')),
                ('position', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='managers.Position')),
            ],
        ),
    ]