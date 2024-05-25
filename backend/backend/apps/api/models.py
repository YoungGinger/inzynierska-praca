from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_player = models.BooleanField(default=False)
    is_coach = models.BooleanField(default=False)
    is_president = models.BooleanField(default=False)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    position = models.CharField(max_length=50, blank=True, null=True)
    goals = models.IntegerField(default=0)
    matches = models.IntegerField(default=0)
    two_minute_penalties = models.IntegerField(default=0)
    yellow_cards = models.IntegerField(default=0)
    red_cards = models.IntegerField(default=0)
    salary = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

class Team(models.Model):
    name = models.CharField(max_length=100)
    matches_played = models.IntegerField(default=0)
    matches_won = models.IntegerField(default=0)
    matches_lost = models.IntegerField(default=0)
    matches_drawn = models.IntegerField(default=0)
    goals_scored = models.IntegerField(default=0)
    points = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Match(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(default='Brak opisu')
    date = models.DateField()
    home_team = models.ForeignKey(Team, related_name='home_matches', on_delete=models.CASCADE, default=1)
    away_team = models.ForeignKey(Team, related_name='away_matches', on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.title
    
class Achievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    goals = models.IntegerField(default=0)
    matches = models.IntegerField(default=0)
    two_minute_penalties = models.IntegerField(default=0)  
    yellow_cards = models.IntegerField(default=0)          
    red_cards = models.IntegerField(default=0)             

    def __str__(self):
        return self.title

    @property
    def average_goals_per_match(self):
        return self.goals / self.matches if self.matches > 0 else 0

class Training(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(default='Brak opisu')
    date = models.DateField()
    players = models.ManyToManyField(User, related_name='trainings') 
    
    def __str__(self):
        return self.title
    
class Financial(models.Model):
    TYPE_CHOICES = (
        ('income', 'Przychód'),
        ('expense', 'Wydatek')
    )
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.get_type_display()} - {self.amount} - {self.date}"
    

class Employee(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Event(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateField()
    description = models.TextField()

    def __str__(self):
        return self.name