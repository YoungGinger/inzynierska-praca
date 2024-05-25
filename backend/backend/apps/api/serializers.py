from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Team, Training, Match, Achievement, Financial, Employee, Event

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'is_player', 'is_coach', 'is_president', 'photo', 'position', 'salary']

class TrainingSerializer(serializers.ModelSerializer):
    players = UserSerializer(many=True, read_only=True)
    player_ids = serializers.PrimaryKeyRelatedField(
        many=True, write_only=True, queryset=User.objects.all(), source='players'
    )

    class Meta:
        model = Training
        fields = ['id', 'title', 'description', 'date', 'players', 'player_ids']

class AchievementSerializer(serializers.ModelSerializer):
    average_goals_per_match = serializers.FloatField(read_only=True)
    class Meta:
        model = Achievement
        fields = ['id', 'title', 'description', 'date', 'goals', 'matches', 'two_minute_penalties', 'yellow_cards', 'red_cards', 'average_goals_per_match']

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'photo', 'position', 'goals', 'matches', 'two_minute_penalties', 'yellow_cards', 'red_cards', 'salary']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class MatchSerializer(serializers.ModelSerializer):
    home_team = TeamSerializer()
    away_team = TeamSerializer()

    class Meta:
        model = Match
        fields = '__all__'

class FinancialSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Financial
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'