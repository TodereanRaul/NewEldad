from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Event

@admin.register(Event)
class EventAdmin(ModelAdmin):
    list_display = ['title', 'date', 'time', 'type', 'location', 'is_active']
    list_filter = ['type', 'is_active', 'date']
    search_fields = ['title', 'description', 'location']
    list_editable = ['is_active']
    date_hierarchy = 'date'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'type')
        }),
        ('Date & Time', {
            'fields': ('date', 'time')
        }),
        ('Location', {
            'fields': ('location',)
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )
    
    ordering = ['-date', '-time']
