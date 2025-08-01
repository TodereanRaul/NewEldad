from django.contrib import admin
from .models import EldadAjutorare
from unfold.admin import ModelAdmin

@admin.register(EldadAjutorare)
class EldadAjutorareAdmin(ModelAdmin):
    list_display = ('id', 'title', 'thumbnail_preview', 'image_count', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('title', 'description')
    readonly_fields = ('id', 'created_at', 'updated_at', 'thumbnail_preview', 'image1_preview', 'image2_preview', 'image3_preview', 'image4_preview', 'image5_preview')
    ordering = ('-created_at',)
    
    # Change the admin panel display names
    verbose_name = "Proiect/Ajutorare"
    verbose_name_plural = "Administrare Proiecte/Ajutorare"
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description')
        }),
        ('Media', {
            'fields': ('thumbnail', 'thumbnail_preview')
        }),
        ('Project Images', {
            'fields': (
                ('image1', 'image1_preview'),
                ('image2', 'image2_preview'),
                ('image3', 'image3_preview'),
                ('image4', 'image4_preview'),
                ('image5', 'image5_preview'),
            )
        }),
        ('Metadata', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    list_per_page = 20
    date_hierarchy = 'created_at'
    
    def thumbnail_preview(self, obj):
        if obj.thumbnail:
            return f'<img src="{obj.thumbnail.url}" style="max-height: 50px; max-width: 50px;" />'
        return "No thumbnail"
    thumbnail_preview.short_description = 'Thumbnail'
    thumbnail_preview.allow_tags = True
    
    def image_count(self, obj):
        return len(obj.get_images())
    image_count.short_description = 'Images'
    
    def image1_preview(self, obj):
        if obj.image1:
            return f'<img src="{obj.image1.url}" style="max-height: 100px; max-width: 100px;" />'
        return "No image"
    image1_preview.short_description = 'Image 1 Preview'
    image1_preview.allow_tags = True
    
    def image2_preview(self, obj):
        if obj.image2:
            return f'<img src="{obj.image2.url}" style="max-height: 100px; max-width: 100px;" />'
        return "No image"
    image2_preview.short_description = 'Image 2 Preview'
    image2_preview.allow_tags = True
    
    def image3_preview(self, obj):
        if obj.image3:
            return f'<img src="{obj.image3.url}" style="max-height: 100px; max-width: 100px;" />'
        return "No image"
    image3_preview.short_description = 'Image 3 Preview'
    image3_preview.allow_tags = True
    
    def image4_preview(self, obj):
        if obj.image4:
            return f'<img src="{obj.image4.url}" style="max-height: 100px; max-width: 100px;" />'
        return "No image"
    image4_preview.short_description = 'Image 4 Preview'
    image4_preview.allow_tags = True
    
    def image5_preview(self, obj):
        if obj.image5:
            return f'<img src="{obj.image5.url}" style="max-height: 100px; max-width: 100px;" />'
        return "No image"
    image5_preview.short_description = 'Image 5 Preview'
    image5_preview.allow_tags = True
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related()
