from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Video
from .serializers import VideoSerializer

class VideoListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, category=None):
        if category:
            videos = Video.objects.filter(category=category).order_by('-published_at')
        else:
            videos = Video.objects.all().order_by('-published_at')
        return Response(VideoSerializer(videos, many=True).data)
