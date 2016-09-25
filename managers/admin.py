from django.contrib import admin

from .models import Person,Users,Company

admin.site.register(Users)
admin.site.register(Person)
admin.site.register(Company)
