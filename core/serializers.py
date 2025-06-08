from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.models import Sum
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (
    UserProfile, Project, ServiceCategory, Service,
    ForumCategory, ForumTopic, ForumReply, TopicVote, ReplyVote,
    ContactMessage, Notification, Tag, ContentCategory
)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(required=False)
    username = serializers.CharField(required=False)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        identifier = attrs.get('email') or attrs.get('username')
        password = attrs.get('password')

        if not identifier:
            raise serializers.ValidationError({
                'error': 'Debe proporcionar email o nombre de usuario'
            })

        if not password:
            raise serializers.ValidationError({
                'error': 'Debe proporcionar una contraseña'
            })

        # Si se proporciona email, buscar el usuario por email
        if '@' in identifier:
            try:
                user = User.objects.get(email=identifier)
                attrs['username'] = user.username
            except User.DoesNotExist:
                raise serializers.ValidationError({
                    'error': 'No existe un usuario con ese email'
                })
        else:
            # Si no es email, usar el identificador como username
            attrs['username'] = identifier

        # Intentar autenticar con las credenciales
        self.user = authenticate(username=attrs['username'], password=password)
        if not self.user:
            raise serializers.ValidationError({
                'error': 'Credenciales inválidas'
            })

        # Obtener tokens usando el método padre
        data = super().validate(attrs)
        
        # Agregar datos del usuario a la respuesta
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
        }
        
        return data

class UserProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = UserProfile
        fields = ('username', 'first_name', 'last_name', 'email', 'bio', 'location', 'birth_date')

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        # Actualizar campos del usuario
        if user_data:
            user = instance.user
            for attr, value in user_data.items():
                setattr(user, attr, value)
            user.save()
        # Actualizar campos del perfil
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class ProjectSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = Project
        fields = ('id', 'title', 'description', 'image', 'tags', 
                 'created_at', 'updated_at', 'author', 'author_name')
        read_only_fields = ('author', 'created_at', 'updated_at')

class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Service
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class ContentCategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField()

    class Meta:
        model = ContentCategory
        fields = '__all__'

    def get_subcategories(self, obj):
        return ContentCategorySerializer(obj.subcategories.all(), many=True).data

class ForumCategorySerializer(serializers.ModelSerializer):
    topics_count = serializers.SerializerMethodField()

    class Meta:
        model = ForumCategory
        fields = '__all__'

    def get_topics_count(self, obj):
        return obj.topics.count()

class ForumReplySerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    votes_count = serializers.SerializerMethodField()
    user_vote = serializers.SerializerMethodField()

    class Meta:
        model = ForumReply
        fields = '__all__'

    def get_votes_count(self, obj):
        return obj.votes.aggregate(
            total=models.Sum('value')
        )['total'] or 0

    def get_user_vote(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                vote = obj.votes.get(user=request.user)
                return vote.value
            except ReplyVote.DoesNotExist:
                return 0
        return 0

class ForumTopicSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    replies_count = serializers.SerializerMethodField()
    votes_count = serializers.SerializerMethodField()
    user_vote = serializers.SerializerMethodField()
    latest_reply = ForumReplySerializer(read_only=True)

    class Meta:
        model = ForumTopic
        fields = '__all__'
        read_only_fields = ('author', 'created_at', 'updated_at', 'views_count')

    def get_replies_count(self, obj):
        return obj.replies.count()

    def get_votes_count(self, obj):
        result = obj.votes.aggregate(total=Sum('value'))
        return result['total'] or 0

    def get_user_vote(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                vote = obj.votes.get(user=request.user)
                return vote.value
            except TopicVote.DoesNotExist:
                return 0
        return 0

class ContactMessageSerializer(serializers.ModelSerializer):
    assigned_to_name = serializers.CharField(source='assigned_to.username', read_only=True)

    class Meta:
        model = ContactMessage
        fields = '__all__'
        read_only_fields = ('status', 'assigned_to')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ('recipient', 'created_at')

class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('La contraseña actual es incorrecta')
        return value

    def validate_new_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('La contraseña debe tener al menos 8 caracteres')
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user 