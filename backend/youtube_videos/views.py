from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
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

class VideoFavoriteView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, video_id):
        try:
            video = Video.objects.get(video_id=video_id)
            video.is_favorite = not video.is_favorite
            video.save()
            return Response({
                'success': True,
                'is_favorite': video.is_favorite
            })
        except Video.DoesNotExist:
            return Response({
                'success': False,
                'error': 'Video not found'
            }, status=status.HTTP_404_NOT_FOUND)
