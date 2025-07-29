from rest_framework import serializers
from ajutorare.models import EldadAjutorare
from media.models import EldadMedia
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class RegisterRequestSerializer(serializers.Serializer):
    firstname = serializers.CharField(max_length=30)
    lastname = serializers.CharField(max_length=30)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class AuthenticationRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class AuthenticationResponseSerializer(serializers.Serializer):
    token = serializers.CharField()

class EldadAjutorareSerializer(serializers.ModelSerializer):
    class Meta:
        model = EldadAjutorare
        fields = ['id', 'title', 'description', 'created_at', 'updated_at']

class EldadMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EldadMedia
        fields = ['yt_id', 'title', 'description', 'type', 'recommendations', 'created_at', 'updated_at']

class TestResponseSerializer(serializers.Serializer):
    text = serializers.CharField() 