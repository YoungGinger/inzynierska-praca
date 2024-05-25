
from django.urls import path
from .views import CustomAuthToken, LogoutView, UserDetailView, TrainingScheduleView, MatchScheduleView, TeamsView, AchievementView, PlayerListView, PlayerDetailView, TrainingListView, TrainingDetailView, FinancialListView, FinancialDetailView, UserSalaryUpdateView, CoachListView, EmployeeListView, EventListView

urlpatterns = [
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/', UserDetailView.as_view(), name='user-detail'),
    path('training-schedule/', TrainingScheduleView.as_view(), name='training-schedule'),
    path('match-schedule/', MatchScheduleView.as_view(), name='match-schedule'),
    path('teams/', TeamsView.as_view(), name='teams'),
    path('achievements/', AchievementView.as_view(), name='achievements'),
    path('players/', PlayerListView.as_view(), name='player-list'),
    path('players/<int:pk>/', PlayerDetailView.as_view(), name='player-detail'),
    path('trainings/', TrainingListView.as_view(), name='training-list'),
    path('trainings/<int:pk>/', TrainingDetailView.as_view(), name='training-detail'),
    path('financials/', FinancialListView.as_view(), name='financial-list'),
    path('financials/<int:pk>/', FinancialDetailView.as_view(), name='financial-detail'),
    path('user-salaries/<int:pk>/', UserSalaryUpdateView.as_view(), name='user-salary-update'),
    path('coaches/', CoachListView.as_view(), name='coach-list'),
    path('employees/', EmployeeListView.as_view(), name='employee-list'),
    path('events/', EventListView.as_view(), name='event-list'),
]
