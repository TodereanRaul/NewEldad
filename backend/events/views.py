from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.utils import timezone
from .models import Event
from .serializers import EventSerializer

# Create your views here.

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.filter(is_active=True)
    serializer_class = EventSerializer
    permission_classes = [AllowAny]  # Allow public access to events
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming events (today and future)"""
        today = timezone.now().date()
        upcoming_events = Event.objects.filter(
            is_active=True,
            date__gte=today
        ).order_by('date', 'time')[:10]  # Limit to 10 upcoming events
        
        serializer = self.get_serializer(upcoming_events, many=True)
        return Response(serializer.data)
