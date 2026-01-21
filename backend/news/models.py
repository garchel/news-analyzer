from django.db import models

class News(models.Model):
    title = models.CharField(max_length=500)
    link = models.URLField(max_length=500, unique=True)
    sentiment = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title