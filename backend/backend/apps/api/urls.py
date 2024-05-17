from django.urls import path
from api.views import CustomAuthToken, LogoutView, UserDetailView

urlpatterns = [
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/', UserDetailView.as_view(), name='user-detail'),
]
