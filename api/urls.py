from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from . import views

urlpatterns = [
    # Authentication endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/test/', views.test_token, name='test_token'),
    
    # User management
    path('register/', views.RegisterView.as_view(), name='register'),
    path('user/', views.get_user_data, name='user_data'),
    path('profile/', views.UserProfileView.as_view(), name='user_profile'),
] 