from django.db import models
from django.contrib.postgres.fields import ArrayField

class EldadMediaType(models.TextChoices):
    VIDEO = 'VIDEO', 'Video'
    AUDIO = 'AUDIO', 'Audio'
    IMAGE = 'IMAGE', 'Image'
    DOCUMENT = 'DOCUMENT', 'Document'

class EldadMedia(models.Model):
    yt_id = models.CharField(max_length=20, primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    type = models.CharField(max_length=10, choices=EldadMediaType.choices)
    recommendations = models.JSONField(default=list, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'eldad_media'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.yt_id} - {self.title}"
