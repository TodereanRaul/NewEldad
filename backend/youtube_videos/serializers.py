import html
from rest_framework import serializers
from .models import Video

class VideoSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    channel_name = serializers.SerializerMethodField()

    def get_title(self, obj):
        return html.unescape(obj.title)
    
    def get_channel_name(self, obj):
        return html.unescape(obj.channel_name)

    class Meta:
        model = Video
        fields = '__all__'
