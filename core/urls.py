from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)
from .views import (
    RegisterView, CustomTokenObtainPairView, UserProfileView,
    ProjectViewSet, ServiceCategoryViewSet, ServiceViewSet,
    ForumCategoryViewSet, ForumTopicViewSet, ForumReplyViewSet,
    ContactMessageViewSet, NotificationViewSet, TagViewSet,
    ContentCategoryViewSet, home_data, get_user_data, test_token,
    change_password
)

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'services/categories', ServiceCategoryViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'forum/categories', ForumCategoryViewSet)
router.register(r'forum/topics', ForumTopicViewSet)
router.register(r'forum/replies', ForumReplyViewSet)
router.register(r'contact', ContactMessageViewSet)
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'tags', TagViewSet)
router.register(r'content/categories', ContentCategoryViewSet)

urlpatterns = [
    # Public endpoints
    path('home/', home_data, name='home_data'),
    
    # Authentication endpoints
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/test/', test_token, name='test_token'),
    
    # User management
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', get_user_data, name='user_data'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('change-password/', change_password, name='change_password'),

    # Include the router URLs
    path('', include(router.urls)),
] 