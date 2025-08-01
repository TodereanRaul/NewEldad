from django.db import models
import uuid

class EldadAjutorare(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    thumbnail = models.ImageField(upload_to='ajutorare/', null=True, blank=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Multiple image fields
    image1 = models.ImageField(upload_to='ajutorare/images/', null=True, blank=True)
    image2 = models.ImageField(upload_to='ajutorare/images/', null=True, blank=True)
    image3 = models.ImageField(upload_to='ajutorare/images/', null=True, blank=True)
    image4 = models.ImageField(upload_to='ajutorare/images/', null=True, blank=True)
    image5 = models.ImageField(upload_to='ajutorare/images/', null=True, blank=True)

    class Meta:
        db_table = 'eldad_ajutorare'
        ordering = ['-created_at']
        verbose_name = "Proiect/Ajutorare"
        verbose_name_plural = "Administrare Proiecte/Ajutorare"

    def __str__(self):
        return self.title
    
    def get_images(self):
        """Return all non-empty images as a list"""
        images = []
        for i in range(1, 6):
            image = getattr(self, f'image{i}')
            if image:
                images.append(image)
        return images
