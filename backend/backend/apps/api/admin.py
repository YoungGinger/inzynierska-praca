from django.contrib import admin
from .models import User, Team, Training, Match

admin.site.register(User) 


@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')

class MatchAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'home_team_display', 'away_team_display')
    list_filter = ('date', 'home_team', 'away_team')
    search_fields = ('title', 'home_team__name', 'away_team__name')

    def home_team_display(self, obj):
        return obj.home_team.name
    home_team_display.short_description = 'Home Team'

    def away_team_display(self, obj):
        return obj.away_team.name
    away_team_display.short_description = 'Away Team'

class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'matches_played', 'matches_won', 'matches_lost', 'matches_drawn', 'goals_scored', 'points')
    search_fields = ('name',)

admin.site.register(Match, MatchAdmin)
admin.site.register(Team, TeamAdmin)