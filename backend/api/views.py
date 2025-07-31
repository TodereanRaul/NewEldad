from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .serializers import (
    RegisterRequestSerializer, AuthenticationRequestSerializer, 
    AuthenticationResponseSerializer, EldadAjutorareSerializer,
    EldadMediaSerializer, TestResponseSerializer
)
from ajutorare.models import EldadAjutorare
from media.models import EldadMedia
from youtube_videos.models import Video

# Authentication Views
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterRequestSerializer(data=request.data)
    if serializer.is_valid():
        user = User.objects.create_user(
            username=serializer.validated_data['email'],
            email=serializer.validated_data['email'],
            password=serializer.validated_data['password'],
            first_name=serializer.validated_data['firstname'],
            last_name=serializer.validated_data['lastname']
        )
        refresh = RefreshToken.for_user(user)
        return Response({
            'token': str(refresh.access_token)
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def authenticate_user(request):
    serializer = AuthenticationRequestSerializer(data=request.data)
    if serializer.is_valid():
        user = authenticate(
            username=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'token': str(refresh.access_token)
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Ajutorare Views
class EldadAjutorareListCreateView(generics.ListCreateAPIView):
    queryset = EldadAjutorare.objects.all()
    serializer_class = EldadAjutorareSerializer
    permission_classes = [IsAuthenticated]

class EldadAjutorareDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EldadAjutorare.objects.all()
    serializer_class = EldadAjutorareSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

# Media Views
class EldadMediaListCreateView(generics.ListCreateAPIView):
    queryset = EldadMedia.objects.all()
    serializer_class = EldadMediaSerializer
    permission_classes = [IsAuthenticated]

class EldadMediaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EldadMedia.objects.all()
    serializer_class = EldadMediaSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'yt_id'

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_media_by_type(request, type):
    media = EldadMedia.objects.filter(type=type)
    serializer = EldadMediaSerializer(media, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_recommendation(request, yt_video_code):
    media = get_object_or_404(EldadMedia, yt_id=yt_video_code)
    recommendation = request.data.get('recommendation', '')
    if recommendation:
        media.recommendations.append(recommendation)
        media.save()
    serializer = EldadMediaSerializer(media)
    return Response(serializer.data)

# Test View
@api_view(['GET'])
@permission_classes([AllowAny])
def test_endpoint(request):
    return Response({'text': 'API is working!'})

# Payment Views (Placeholder - you'll need to implement actual payment logic)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_payment(request):
    # Implement PayPal/Stripe payment logic here
    return Response({'message': 'Payment endpoint - implement payment logic'})

@api_view(['GET'])
@permission_classes([AllowAny])
def payment_success(request):
    return Response({'message': 'Payment successful'})

@api_view(['GET'])
@permission_classes([AllowAny])
def payment_cancel(request):
    return Response({'message': 'Payment cancelled'})

@api_view(['GET'])
@permission_classes([AllowAny])
def payment_error(request):
    return Response({'message': 'Payment error'})

# Video Views
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
