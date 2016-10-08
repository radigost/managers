from django.contrib import admin

from .models import Person,Users,Company,Position,Npc,Industry,Node

admin.site.register(Users)
admin.site.register(Person)
admin.site.register(Company)
admin.site.register(Position)
admin.site.register(Npc)
admin.site.register(Industry)

class NodeAdmin(admin.ModelAdmin):
    list_display = ('id','text','is_fail','is_success')
    # fields = ['id', 'category','text','is_fail','is_success']
    search_fields = ['text']
    list_filter = ('category',)
admin.site.register(Node,NodeAdmin)

