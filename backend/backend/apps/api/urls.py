from django.urls import path
from api import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
]
