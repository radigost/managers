from rest_framework import serializers
from managers.models import Person, Company

class PersonSerializer(serializers.ModelSerializer):
    company = serializers.StringRelatedField()
    position = serializers.StringRelatedField()
    class Meta:
        model = Person



class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company