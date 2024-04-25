from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *



class StolenLaptopDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StolenLaptopDetails
        fields = '__all__'

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                email=email, password=password)

            if not user:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')

            if not user.is_active:
                msg = 'User account is disabled.'
                raise serializers.ValidationError(msg, code='authorization')

        else:
            msg = 'Must include "email" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        refresh = RefreshToken.for_user(user)

        # Include full_name in the response
        full_name = user.full_name if hasattr(user, 'full_name') else None

        return {
            'email': email,
            'full_name': full_name,
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh)
        }

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('id', 'full_name', 'email', 'police_id', 'aadhaar_no', 'contact_no', 'address', 'user_profile')


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=128,
        write_only=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ('full_name', 'email', 'password', 'police_id', 'aadhaar_no', 'contact_no', 'address')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
