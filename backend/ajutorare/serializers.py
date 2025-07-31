from rest_framework import serializers
from .models import EldadAjutorare

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
        """Return all images as a list of URLs"""
        images = []
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
        """Return all images as a list of URLs"""
        images = []
        for i in range(1, 6):
            image = getattr(obj, f'image{i}')
            if image:
                images.append(image.url)
        return images
