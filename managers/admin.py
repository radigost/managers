from django.contrib import admin

from .models import Person,Users,Company,Position,Npc

admin.site.register(Users)
admin.site.register(Person)
admin.site.register(Company)
admin.site.register(Position)
admin.site.register(Npc)
