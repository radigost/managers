from django.contrib import admin

from .models import Person,Question,Answer,Questions_rel_Answers

admin.site.register(Person)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Questions_rel_Answers)