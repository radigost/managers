from rest_framework import serializers
from managers.models import Person, Company

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company