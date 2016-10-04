from rest_framework import serializers
from managers.models import Person, Company, Npc


class CompanySerializer(serializers.ModelSerializer):
    # persons=PersonSerializer(many=True)
    # companies_set = serializers.StringRelatedField(many=True)
    class Meta:
        model = Company
        fields = ('id', 'name','description','size','person_set','npc_set')

class PersonSerializer(serializers.ModelSerializer):
    # company = serializers.StringRelatedField()
    position = serializers.StringRelatedField()
    related_companies = CompanySerializer(many=True)
    class Meta:
        model = Person

class NpcSerializer(serializers.ModelSerializer):
    company = serializers.StringRelatedField()
    position = serializers.StringRelatedField()
    class Meta:
        model = Npc



