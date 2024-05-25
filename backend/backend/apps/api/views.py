from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model, logout
from api.serializers import UserSerializer
from rest_framework import status, generics, permissions
from .models import Training, Match, Team, Achievement, Financial, Employee, Event
from .serializers import TrainingSerializer, MatchSerializer, TeamSerializer, AchievementSerializer, PlayerSerializer, UserSerializer, FinancialSerializer, EmployeeSerializer, EventSerializer

User = get_user_model()

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = User.objects.get(id=token.user_id)
        user_serializer = UserSerializer(user)
        return Response({
            'token': token.key,
            'user': user_serializer.data
        })

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        logout(request)
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        user_serializer = UserSerializer(user)
        return Response(user_serializer.data)

class TrainingScheduleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        trainings = Training.objects.all()
        serializer = TrainingSerializer(trainings, many=True)
        return Response(serializer.data)
    
class MatchScheduleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        matches = Match.objects.all()
        serializer = MatchSerializer(matches, many=True)
        return Response(serializer.data)
    
class TeamsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)
    
class AchievementView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        achievements = Achievement.objects.filter(user=request.user)
        serializer = AchievementSerializer(achievements, many=True)
        return Response(serializer.data)
    
class PlayerListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        players = User.objects.filter(is_player=True)
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PlayerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_player=True)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class PlayerDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        player = User.objects.get(pk=pk)
        serializer = PlayerSerializer(player)
        return Response(serializer.data)

    def put(self, request, pk):
        player = User.objects.get(pk=pk)
        serializer = PlayerSerializer(player, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        player = User.objects.get(pk=pk)
        player.delete()
        return Response(status=204)
    
class TrainingListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        trainings = Training.objects.all()
        serializer = TrainingSerializer(trainings, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TrainingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TrainingDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        training = Training.objects.get(pk=pk)
        serializer = TrainingSerializer(training)
        return Response(serializer.data)

    def put(self, request, pk):
        training = Training.objects.get(pk=pk)
        serializer = TrainingSerializer(training, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        training = Training.objects.get(pk=pk)
        training.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class MatchListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        matches = Match.objects.all()
        serializer = MatchSerializer(matches, many=True)
        return Response(serializer.data)

class FinancialListView(generics.ListCreateAPIView):
    queryset = Financial.objects.all()
    serializer_class = FinancialSerializer
    permission_classes = [permissions.IsAuthenticated]

class FinancialDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Financial.objects.all()
    serializer_class = FinancialSerializer
    permission_classes = [permissions.IsAuthenticated]

class PlayerSalaryView(generics.ListAPIView):
    queryset = User.objects.filter(is_player=True)
    serializer_class = PlayerSerializer

class PlayerSalaryUpdateView(generics.UpdateAPIView):
    queryset = User.objects.filter(is_player=True)
    serializer_class = PlayerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.salary = request.data.get("salary", instance.salary)
        instance.save()
        return self.partial_update(request, *args, **kwargs)
    
class CoachListView(generics.ListAPIView):
    queryset = User.objects.filter(is_coach=True)
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserSalaryUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['patch']

class EmployeeListView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EventListView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer