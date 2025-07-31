from django.db import models

class Video(models.Model):
    CATEGORY_CHOICES = [
        ('music', 'Music'),
        ('kids', 'Kids'),
        ('podcast', 'Podcast'),
        ('reels', 'Reels'),
        ('video', 'Video'),
        ('autres', 'Autres'),
    ]
    title = models.CharField(max_length=255)
    video_id = models.CharField(max_length=50, unique=True)
    thumbnail = models.URLField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    published_at = models.DateTimeField()
    channel_id = models.CharField(max_length=100, blank=True, null=True)
    channel_name = models.CharField(max_length=200, blank=True, null=True)
    is_favorite = models.BooleanField(default=False)  # Add this field

    def __str__(self):
        return self.title
