from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import EldadAjutorare
from .serializers import EldadAjutorareSerializer, EldadAjutorareListSerializer

# Create your views here.

class EldadAjutorareListView(generics.ListAPIView):
    queryset = EldadAjutorare.objects.all()
    serializer_class = EldadAjutorareListSerializer
    permission_classes = [AllowAny]
    pagination_class = None  # Disable pagination for this endpoint

class EldadAjutorareDetailView(generics.RetrieveAPIView):
    queryset = EldadAjutorare.objects.all()
    serializer_class = EldadAjutorareSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'
