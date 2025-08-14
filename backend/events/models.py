from django.db import models
import uuid

class Event(models.Model):
    EVENT_TYPE_CHOICES = [
        ('mission', 'Misiune'),
        ('concert', 'Concert'),
        ('prayer', 'Rugăciune'),
        ('turneu', 'Turneu'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    date = models.DateField()
    time = models.TimeField(null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    type = models.CharField(max_length=20, choices=EVENT_TYPE_CHOICES, default='turneu')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'events'
        ordering = ['date', 'time']
        verbose_name = "Event"
        verbose_name_plural = "Events"

    def __str__(self):
        return f"{self.title} - {self.date}"
