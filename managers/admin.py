from django.contrib import admin

from .models import Person,Users,Company,Position,Npc,Industry

admin.site.register(Users)
admin.site.register(Person)
admin.site.register(Company)
admin.site.register(Position)
admin.site.register(Npc)
admin.site.register(Industry)
