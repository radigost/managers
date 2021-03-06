# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-01-04 21:49
from __future__ import unicode_literals

from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('managers', '0014_auto_20160928_0528'),
    ]

    operations = [
        migrations.CreateModel(
            name='Industry',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Node',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('category', models.CharField(choices=[('player', 'player'), ('npc', 'npc')], max_length=10)),
                ('text', models.CharField(max_length=250)),
                ('is_fail', models.NullBooleanField()),
                ('is_success', models.NullBooleanField()),
                ('is_start', models.NullBooleanField()),
                ('type', models.CharField(default=None, max_length=15, null=True)),
                ('choice', models.ManyToManyField(blank=True, default=None, to='managers.Node')),
            ],
        ),
        migrations.CreateModel(
            name='Npc',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('image_path', models.CharField(default=None, max_length=150, null=True)),
                ('stats', django.contrib.postgres.fields.jsonb.JSONField(default={'money': 0})),
            ],
        ),
        migrations.RenameField(
            model_name='person',
            old_name='companyDetail',
            new_name='company',
        ),
        migrations.AddField(
            model_name='company',
            name='description',
            field=models.CharField(default=None, max_length=350, null=True),
        ),
        migrations.AddField(
            model_name='company',
            name='size',
            field=models.IntegerField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='person',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='person',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='persons', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='person',
            name='related_companies',
            field=models.ManyToManyField(to='managers.Company'),
        ),
        migrations.AddField(
            model_name='npc',
            name='company',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='managers.Company'),
        ),
        migrations.AddField(
            model_name='npc',
            name='position',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='managers.Position'),
        ),
        migrations.AddField(
            model_name='company',
            name='industry',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='managers.Industry'),
        ),
    ]
