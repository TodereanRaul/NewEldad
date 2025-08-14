from rest_framework import serializers
from .models import EldadAjutorare
from django.conf import settings

class EldadAjutorareSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    
    class Meta:
        model = EldadAjutorare
        fields = [
            'id', 
            'title', 
            'thumbnail', 
            'description', 
            'created_at', 
            'updated_at',
            'images'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_images(self, obj):
        """Return all images as a list of absolute URLs"""
        images = []
        request = self.context.get('request')
        if request:
            for i in range(1, 6):
                image = getattr(obj, f'image{i}')
                if image:
                    # Use absolute URL with current domain
                    images.append(request.build_absolute_uri(image.url))
        else:
            # Fallback to relative URLs if no request context
            for i in range(1, 6):
                image = getattr(obj, f'image{i}')
                if image:
                    images.append(image.url)
        return images

class EldadAjutorareListSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    
    class Meta:
        model = EldadAjutorare
        fields = [
            'id', 
            'title', 
            'thumbnail', 
            'description', 
            'created_at',
            'images'
        ]
        read_only_fields = ['id', 'created_at']
    
    def get_images(self, obj):
        """Return all images as a list of absolute URLs"""
        images = []
        request = self.context.get('request')
        if request:
            for i in range(1, 6):
                image = getattr(obj, f'image{i}')
                if image:
                    # Use absolute URL with current domain
                    images.append(request.build_absolute_uri(image.url))
        else:
            # Fallback to relative URLs if no request context
            for i in range(1, 6):
                image = getattr(obj, f'image{i}')
                if image:
                    images.append(image.url)
        return images
