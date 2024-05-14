from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_president = models.BooleanField(default=False)
    is_coach = models.BooleanField(default=False)
    is_player = models.BooleanField(default=False)
