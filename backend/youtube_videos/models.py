from django.db import models

class Video(models.Model):
    CATEGORY_CHOICES = [
        ('music', 'Music'),
        ('kids', 'Kids'),
        ('podcast', 'Podcast'),
        ('autres', 'Autres'),
    ]
    title = models.CharField(max_length=255)
    video_id = models.CharField(max_length=50, unique=True)
    thumbnail = models.URLField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    published_at = models.DateTimeField()

    def __str__(self):
        return self.title
