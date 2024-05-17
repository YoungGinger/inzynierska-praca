from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_player = models.BooleanField(default=False)
    is_coach = models.BooleanField(default=False)
    is_president = models.BooleanField(default=False)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    position = models.CharField(max_length=50, blank=True, null=True)
