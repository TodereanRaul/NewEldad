from django.db import models
import uuid

class EldadAjutorare(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'eldad_ajutorare'
        ordering = ['-created_at']

    def __str__(self):
        return self.title
