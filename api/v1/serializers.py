from rest_framework import serializers
from managers.models import Person, Company, Npc
from django.contrib.auth.models import User, Group


class CompanySerializer(serializers.ModelSerializer):
    # persons=PersonSerializer(many=True)
    # companies_set = serializers.StringRelatedField(many=True)
    class Meta:
        model = Company
        fields = ('id', 'name','description','size','person_set','npc_set')

class PersonSerializer(serializers.ModelSerializer):
    # company = serializers.StringRelatedField()
    position = serializers.StringRelatedField()
    related_companies = CompanySerializer(many=True,read_only=True)
    class Meta:
        model = Person

class NpcSerializer(serializers.ModelSerializer):
    company = serializers.StringRelatedField()
    position = serializers.StringRelatedField()
    class Meta:
        model = Npc



class UserSerializer(serializers.HyperlinkedModelSerializer):
    persons = serializers.PrimaryKeyRelatedField(many=True, queryset=Person.objects.all())
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups', 'persons')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')