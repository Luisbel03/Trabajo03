from django.shortcuts import render
from rest_framework import status, generics, viewsets, filters
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from django.contrib.auth.models import User
from django.db.models import F, Sum
from django.core.mail import send_mail
from django.conf import settings
from .serializers import (
    UserSerializer, UserProfileSerializer, ProjectSerializer,
    ServiceCategorySerializer, ServiceSerializer,
    ForumCategorySerializer, ForumTopicSerializer, ForumReplySerializer,
    ContactMessageSerializer, NotificationSerializer,
    TagSerializer, ContentCategorySerializer,
    CustomTokenObtainPairSerializer, ChangePasswordSerializer
)
from .models import (
    UserProfile, Project, ServiceCategory, Service,
    ForumCategory, ForumTopic, ForumReply, TopicVote, ReplyVote,
    ContactMessage, Notification, Tag, ContentCategory
)
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user.profile

class HomePagePermission(IsAuthenticatedOrReadOnly):
    def has_permission(self, request, view):
        if view.action == 'home':
            return True
        return super().has_permission(request, view)

@api_view(['GET'])
@permission_classes([AllowAny])
def home_data(request):
    """
    Get public data for home page
    """
    featured_services = Service.objects.filter(is_featured=True)[:3]
    recent_projects = Project.objects.all()[:3]
    
    return Response({
        'featured_services': ServiceSerializer(featured_services, many=True).data,
        'recent_projects': ProjectSerializer(recent_projects, many=True).data,
    })

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = Project.objects.all()
        tag = self.request.query_params.get('tag', None)
        if tag is not None:
            queryset = queryset.filter(tags__contains=[tag])
        return queryset

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    """
    Get the current user's data
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def test_token(request):
    """
    Test if the provided token is valid
    """
    return Response({'message': 'Token is valid'}, status=status.HTTP_200_OK)

class ServiceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description', 'category__name']

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)

class ForumCategoryViewSet(viewsets.ModelViewSet):
    queryset = ForumCategory.objects.all()
    serializer_class = ForumCategorySerializer
    permission_classes = [IsAuthenticated]

class ForumTopicViewSet(viewsets.ModelViewSet):
    queryset = ForumTopic.objects.all()
    serializer_class = ForumTopicSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'content']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views_count = F('views_count') + 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def vote(self, request, pk=None):
        topic = self.get_object()
        value = request.data.get('value', 0)
        
        if value not in [-1, 0, 1]:
            return Response(
                {'error': 'Invalid vote value'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            vote = TopicVote.objects.get(user=request.user, topic=topic)
            if value == 0:
                vote.delete()
            else:
                vote.value = value
                vote.save()
        except TopicVote.DoesNotExist:
            if value != 0:
                TopicVote.objects.create(
                    user=request.user,
                    topic=topic,
                    value=value
                )

        # Recalcular el total de votos
        total_votes = topic.votes.aggregate(total=Sum('value'))['total'] or 0
        
        return Response({
            'status': 'success',
            'votes_count': total_votes,
            'user_vote': value
        })

class ForumReplyViewSet(viewsets.ModelViewSet):
    queryset = ForumReply.objects.all()
    serializer_class = ForumReplySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        reply = serializer.save(author=self.request.user)
        # Create notification for topic author
        if reply.author != reply.topic.author:
            Notification.objects.create(
                recipient=reply.topic.author,
                notification_type='forum_reply',
                title=f'New reply in "{reply.topic.title}"',
                message=f'{reply.author.username} replied to your topic',
                related_link=f'/forum/topic/{reply.topic.id}'
            )

    def perform_update(self, serializer):
        reply = self.get_object()
        # Verificar si el usuario es el autor del comentario
        if reply.author != self.request.user:
            raise PermissionError("No tienes permiso para editar este comentario")
        serializer.save()

    def perform_destroy(self, instance):
        # Verificar si el usuario es el autor del comentario
        if instance.author != self.request.user:
            raise PermissionError("No tienes permiso para eliminar este comentario")
        instance.delete()

    @action(detail=True, methods=['post'])
    def vote(self, request, pk=None):
        reply = self.get_object()
        value = request.data.get('value', 0)
        
        if value not in [-1, 0, 1]:
            return Response(
                {'error': 'Invalid vote value'},
                status=status.HTTP_400_BAD_REQUEST
            )

        vote, created = ReplyVote.objects.get_or_create(
            user=request.user,
            reply=reply,
            defaults={'value': value}
        )

        if not created:
            if value == 0:
                vote.delete()
            else:
                vote.value = value
                vote.save()

        return Response({'status': 'success'})

    @action(detail=True, methods=['post'])
    def mark_as_solution(self, request, pk=None):
        reply = self.get_object()
        if request.user != reply.topic.author:
            return Response(
                {'error': 'Only topic author can mark solution'},
                status=status.HTTP_403_FORBIDDEN
            )

        reply.is_solution = not reply.is_solution
        reply.save()
        return Response({'is_solution': reply.is_solution})

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]  # Permitir acceso a todos para crear mensajes

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [AllowAny()]

    def perform_create(self, serializer):
        message = serializer.save()
        try:
            # Send email notification
            send_mail(
                f'New Contact Message: {message.subject}',
                f'From: {message.name} ({message.email})\n\n{message.message}',
                settings.DEFAULT_FROM_EMAIL,
                [settings.ADMIN_EMAIL],
                fail_silently=True,
            )
        except Exception as e:
            # Log the error but don't prevent message creation
            print(f"Error sending email: {e}")

class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user)

    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        return Response({'status': 'success'})

    @action(detail=False, methods=['post'])
    def mark_all_as_read(self, request):
        self.get_queryset().update(is_read=True)
        return Response({'status': 'success'})

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ContentCategoryViewSet(viewsets.ModelViewSet):
    queryset = ContentCategory.objects.all()
    serializer_class = ContentCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=True)
    def tree(self, request, pk=None):
        """
        Get the complete tree starting from this category
        """
        category = self.get_object()
        serializer = self.get_serializer(category)
        return Response(serializer.data)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'Usuario creado exitosamente',
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    """
    Change user password
    """
    serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        try:
            serializer.save()
            return Response({'message': 'Contraseña actualizada exitosamente'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
