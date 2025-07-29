from django.contrib import admin
from .models import EldadMedia, EldadMediaType
from unfold.admin import ModelAdmin

@admin.register(EldadMedia)
class EldadMediaAdmin(ModelAdmin):
    list_display = ('yt_id', 'title', 'type', 'created_at', 'updated_at')
    list_filter = ('type', 'created_at', 'updated_at')
    search_fields = ('yt_id', 'title', 'description')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('yt_id', 'title', 'description', 'type')
        }),
        ('Recommendations', {
            'fields': ('recommendations',),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    list_per_page = 20
    date_hierarchy = 'created_at'
    
    def get_queryset(self, request):
        return super().get_queryset(request)
    
    def get_recommendations_count(self, obj):
        return len(obj.recommendations) if obj.recommendations else 0
    get_recommendations_count.short_description = 'Recommendations Count'
