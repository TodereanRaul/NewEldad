from django.urls import path
from .views import VideoListView

app_name = 'youtube_videos'

urlpatterns = [
    path('videos/', VideoListView.as_view(), name='video-list'),
    path('videos/<str:category>/', VideoListView.as_view(), name='video-by-category'),
]
